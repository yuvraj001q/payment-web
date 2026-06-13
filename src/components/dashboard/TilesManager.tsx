"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  GripVertical,
  Trash2,
  Edit2,
  Eye,
  EyeOff,
  Loader2,
  Link,
  Image,
  Video,
  MessageCircle,
  Zap,
  MapPin,
  Star,
  Calendar,
  GalleryHorizontal,
} from "lucide-react";
import { createTileAction, updateTileAction, deleteTileAction, reorderTilesAction } from "@/actions/tiles";
import type { Tile } from "@/db/schema";

const tileTypeOptions = [
  { value: "link", label: "Link", icon: Link },
  { value: "image", label: "Image", icon: Image },
  { value: "video", label: "Video", icon: Video },
  { value: "whatsapp", label: "WhatsApp", icon: MessageCircle },
  { value: "flash_offer", label: "Flash Offer", icon: Zap },
  { value: "map", label: "Map", icon: MapPin },
  { value: "review", label: "Review", icon: Star },
  { value: "booking", label: "Booking", icon: Calendar },
  { value: "gallery", label: "Gallery", icon: GalleryHorizontal },
];

function SortableTile({
  tile,
  onEdit,
  onToggle,
  onDelete,
}: {
  tile: Tile;
  onEdit: (tile: Tile) => void;
  onToggle: (id: string, active: boolean) => void;
  onDelete: (id: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: tile.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const typeInfo = tileTypeOptions.find((t) => t.value === tile.tileType);
  const Icon = typeInfo?.icon || Link;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="glass-card p-4 flex items-center gap-4 group"
    >
      <button {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground">
        <GripVertical className="h-5 w-5" />
      </button>

      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center shrink-0">
        <Icon className="h-5 w-5 text-indigo-400" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="font-medium truncate">{tile.title}</div>
        <div className="text-xs text-muted-foreground capitalize">{tile.tileType.replace("_", " ")}</div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">
          {tile.gridWidth}x{tile.gridHeight}
        </span>
        <button
          onClick={() => onToggle(tile.id, !tile.isActive)}
          className="p-2 rounded-lg hover:bg-white/5 transition-colors"
        >
          {tile.isActive ? (
            <Eye className="h-4 w-4 text-emerald-400" />
          ) : (
            <EyeOff className="h-4 w-4 text-muted-foreground" />
          )}
        </button>
        <button
          onClick={() => onEdit(tile)}
          className="p-2 rounded-lg hover:bg-white/5 transition-colors"
        >
          <Edit2 className="h-4 w-4 text-muted-foreground" />
        </button>
        <button
          onClick={() => onDelete(tile.id)}
          className="p-2 rounded-lg hover:bg-red-500/10 transition-colors"
        >
          <Trash2 className="h-4 w-4 text-red-400" />
        </button>
      </div>
    </div>
  );
}

function TileForm({
  tile,
  onSave,
  onCancel,
}: {
  tile?: Tile | null;
  onSave: (data: any) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState({
    tileType: tile?.tileType || "link",
    title: tile?.title || "",
    description: tile?.description || "",
    url: tile?.url || "",
    imageUrl: tile?.imageUrl || "",
    videoUrl: tile?.videoUrl || "",
    gridWidth: tile?.gridWidth || 1,
    gridHeight: tile?.gridHeight || 1,
    ctaText: tile?.ctaText || "",
    whatsappMessage: tile?.whatsappMessage || "",
    backgroundStyle: tile?.backgroundStyle || "glass",
    countdownEnd: tile?.countdownEnd
      ? new Date(tile.countdownEnd).toISOString().slice(0, 16)
      : "",
  });

  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      await onSave({
        ...form,
        countdownEnd: form.countdownEnd ? new Date(form.countdownEnd).toISOString() : null,
      });
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="glass-card p-6 overflow-hidden"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="label">Tile Type</label>
            <select
              value={form.tileType}
              onChange={(e) => setForm({ ...form, tileType: e.target.value })}
              className="input"
            >
              {tileTypeOptions.map((opt) => (
                <option key={opt.value} value={opt.value} className="bg-[#0a0a0f]">
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="label">Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="input"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="label">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="input min-h-[60px] resize-y"
            rows={2}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="label">URL</label>
            <input
              type="url"
              value={form.url}
              onChange={(e) => setForm({ ...form, url: e.target.value })}
              className="input"
              placeholder="https://..."
            />
          </div>
          <div className="space-y-2">
            <label className="label">CTA Button Text</label>
            <input
              type="text"
              value={form.ctaText}
              onChange={(e) => setForm({ ...form, ctaText: e.target.value })}
              className="input"
              placeholder="Learn More"
            />
          </div>
        </div>

        {(form.tileType === "image" || form.tileType === "gallery") && (
          <div className="space-y-2">
            <label className="label">Image URL</label>
            <input
              type="url"
              value={form.imageUrl}
              onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
              className="input"
            />
          </div>
        )}

        {form.tileType === "video" && (
          <div className="space-y-2">
            <label className="label">Video URL</label>
            <input
              type="url"
              value={form.videoUrl}
              onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
              className="input"
            />
          </div>
        )}

        {form.tileType === "whatsapp" && (
          <div className="space-y-2">
            <label className="label">Pre-configured Message</label>
            <textarea
              value={form.whatsappMessage}
              onChange={(e) => setForm({ ...form, whatsappMessage: e.target.value })}
              className="input min-h-[60px] resize-y"
              rows={2}
              placeholder="Hi, I saw your Predator Grid page..."
            />
          </div>
        )}

        {form.tileType === "flash_offer" && (
          <div className="space-y-2">
            <label className="label">Countdown End</label>
            <input
              type="datetime-local"
              value={form.countdownEnd}
              onChange={(e) => setForm({ ...form, countdownEnd: e.target.value })}
              className="input"
            />
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          <div className="space-y-2">
            <label className="label">Width</label>
            <select
              value={form.gridWidth}
              onChange={(e) => setForm({ ...form, gridWidth: Number(e.target.value) })}
              className="input"
            >
              {[1, 2, 3, 4].map((w) => (
                <option key={w} value={w} className="bg-[#0a0a0f]">
                  {w}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="label">Height</label>
            <select
              value={form.gridHeight}
              onChange={(e) => setForm({ ...form, gridHeight: Number(e.target.value) })}
              className="input"
            >
              {[1, 2].map((h) => (
                <option key={h} value={h} className="bg-[#0a0a0f]">
                  {h}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="label">Style</label>
            <select
              value={form.backgroundStyle}
              onChange={(e) => setForm({ ...form, backgroundStyle: e.target.value })}
              className="input"
            >
              {["glass", "gradient", "solid", "outline"].map((s) => (
                <option key={s} value={s} className="bg-[#0a0a0f]">
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button type="button" onClick={onCancel} className="btn-ghost">
            Cancel
          </button>
          <button type="submit" disabled={isPending} className="btn-primary">
            {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {tile ? "Update Tile" : "Create Tile"}
          </button>
        </div>
      </form>
    </motion.div>
  );
}

export default function TilesManager({
  initialTiles,
  profileId,
}: {
  initialTiles: Tile[];
  profileId: string;
}) {
  const router = useRouter();
  const [tiles, setTiles] = useState<Tile[]>(initialTiles);
  const [showForm, setShowForm] = useState(false);
  const [editingTile, setEditingTile] = useState<Tile | null>(null);
  const [isPending, startTransition] = useTransition();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setTiles((items) => {
      const oldIndex = items.findIndex((i) => i.id === active.id);
      const newIndex = items.findIndex((i) => i.id === over.id);
      const newItems = arrayMove(items, oldIndex, newIndex);

      startTransition(async () => {
        await reorderTilesAction(newItems.map((i) => i.id));
      });

      return newItems;
    });
  }

  async function handleCreate(data: any) {
    const result = await createTileAction({ ...data, profileId });
    if (result?.tile) {
      setTiles((prev) => [...prev, result.tile]);
      setShowForm(false);
      router.refresh();
    }
  }

  async function handleUpdate(data: any) {
    if (!editingTile) return;
    const result = await updateTileAction(editingTile.id, data);
    if (result?.tile) {
      setTiles((prev) => prev.map((t) => (t.id === editingTile.id ? result.tile : t)));
      setEditingTile(null);
      setShowForm(false);
      router.refresh();
    }
  }

  async function handleDelete(id: string) {
    await deleteTileAction(id);
    setTiles((prev) => prev.filter((t) => t.id !== id));
    router.refresh();
  }

  async function handleToggle(id: string, active: boolean) {
    await updateTileAction(id, { isActive: active });
    setTiles((prev) => prev.map((t) => (t.id === id ? { ...t, isActive: active } : t)));
    router.refresh();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Tile Manager</h1>
          <p className="text-muted-foreground mt-1">
            Drag to reorder, click to edit. {tiles.length} tiles configured.
          </p>
        </div>
        <button
          onClick={() => {
            setEditingTile(null);
            setShowForm(true);
          }}
          className="btn-primary"
        >
          <Plus className="h-4 w-4" />
          Add Tile
        </button>
      </div>

      <AnimatePresence>
        {showForm && (
          <TileForm
            tile={editingTile}
            onSave={editingTile ? handleUpdate : handleCreate}
            onCancel={() => {
              setShowForm(false);
              setEditingTile(null);
            }}
          />
        )}
      </AnimatePresence>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={tiles.map((t) => t.id)} strategy={rectSortingStrategy}>
          <div className="space-y-3">
            {tiles.map((tile) => (
              <SortableTile
                key={tile.id}
                tile={tile}
                onEdit={(t) => {
                  setEditingTile(t);
                  setShowForm(true);
                }}
                onToggle={handleToggle}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {tiles.length === 0 && !showForm && (
        <div className="glass-card p-12 text-center">
          <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto mb-4">
            <Plus className="h-8 w-8 text-indigo-400" />
          </div>
          <h3 className="text-lg font-semibold">No tiles yet</h3>
          <p className="text-muted-foreground mt-2">
            Start building your Bento Grid by adding your first tile.
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="btn-primary mt-4"
          >
            <Plus className="h-4 w-4" />
            Add Your First Tile
          </button>
        </div>
      )}
    </div>
  );
}
