import React, { useState } from "react";
import { TextField, Button } from "../vibes";
import { createCategory } from "../services/api";

interface CategoryFormProps {
  onCreated: (category: { id: number; name: string }) => void;
  onCancel: () => void;
}

export function CategoryForm({ onCreated, onCancel }: CategoryFormProps) {
  const [name, setName] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Category name is required");
      return;
    }

    setIsSubmitting(true);
    try {
      const category = await createCategory(name.trim());
      onCreated(category);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create category");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  };

  const buttonGroupStyle: React.CSSProperties = {
    display: "flex",
    gap: "0.5rem",
    marginTop: "0.5rem",
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <TextField
        label="Category Name"
        type="text"
        placeholder="Enter category name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          if (error) setError(undefined);
        }}
        error={error}
        fullWidth
        required
        autoFocus
      />

      <div style={buttonGroupStyle}>
        <Button type="submit" variant="primary" disabled={isSubmitting} fullWidth>
          {isSubmitting ? "Adding..." : "Add Category"}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
      </div>
    </form>
  );
}