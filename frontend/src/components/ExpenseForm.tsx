/**
 * Form component for adding/editing expenses
 */

import React, { useState } from "react";
import { ExpenseFormData } from "../types";
import { TextField, SelectBox, Button, Modal } from "../vibes";
import { useExpenseForm } from "../hooks/useExpenseForm";
import { useCategories } from "../hooks/useCategories";
import { CategoryForm } from "./CategoryForm";
import { formatDate } from "../utils/expenseUtils";

interface ExpenseFormProps {
  initialData?: Partial<ExpenseFormData>;
  onSubmit: (data: ExpenseFormData) => Promise<void>;
  onCancel?: () => void;
  submitLabel?: string;
}

export function ExpenseForm({
  initialData,
  onSubmit,
  onCancel,
  submitLabel = "Add Expense",
}: ExpenseFormProps) {
  const { formData, errors, isSubmitting, handleChange, handleSubmit } =
    useExpenseForm({
      initialData,
      onSubmit,
    });

  const { categories, reloadCategories } = useCategories();
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  const formStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  };

  const categoryRowStyle: React.CSSProperties = {
    display: "flex",
    gap: "0.5rem",
    alignItems: "flex-end",
  };

  const buttonGroupStyle: React.CSSProperties = {
    display: "flex",
    gap: "0.5rem",
    marginTop: "0.5rem",
  };

  const categoryOptions = categories.map((category) => ({
    value: category.name,
    label: category.name,
  }));

  const handleCategoryCreated = async (category: { id: number; name: string }) => {
    await reloadCategories();
    handleChange("category", category.name);
    setIsCategoryModalOpen(false);
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <TextField
        label="Amount"
        type="number"
        step="0.01"
        placeholder="0.00"
        value={formData.amount}
        onChange={(e) => handleChange("amount", e.target.value)}
        error={errors.amount}
        fullWidth
        required
      />

      <TextField
        label="Description"
        type="text"
        placeholder="Enter description"
        value={formData.description}
        onChange={(e) => handleChange("description", e.target.value)}
        error={errors.description}
        fullWidth
        required
      />

      <div style={categoryRowStyle}>
        <SelectBox
          label="Category"
          options={categoryOptions}
          value={formData.category}
          onChange={(e) => handleChange("category", e.target.value)}
          error={errors.category}
          fullWidth
          required
        />
        <Button
          type="button"
          variant="secondary"
          onClick={() => setIsCategoryModalOpen(true)}
        >
          Add Category
        </Button>
      </div>

      <Modal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        title="Add New Category"
      >
        <CategoryForm
          onCreated={handleCategoryCreated}
          onCancel={() => setIsCategoryModalOpen(false)}
        />
      </Modal>

      <TextField
        label="Date"
        type="date"
        value={formData.date}
        onChange={(e) => handleChange("date", e.target.value)}
        error={errors.date}
        fullWidth
        required
        max={formatDate(new Date())}
      />

      <div style={buttonGroupStyle}>
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
          fullWidth
        >
          {isSubmitting ? "Submitting..." : submitLabel}
        </Button>
        {onCancel && (
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
