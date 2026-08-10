### BUG-001: New Expenses Not Appearing at Top of List

#### Problem

When adding a new expense, it doesn't appear at the top of the expense list. Expenses were ordered by their creation timestamp (`created_at`) rather than expense date, causing newly added expenses to appear in unpredictable positions.

#### Solution

Changed the expense ordering in `Api::ExpensesController#index` from `created_at: :desc` to `date: :desc`. Also updated the month/year filter to use the `date` column instead of `created_at`, ensuring consistency between the ordering and filtering logic.

#### Files Changed

- `backend/app/controllers/api/expenses_controller.rb`
- `backend/spec/requests/api/expenses_spec.rb`

#### Notes

The endpoint now returns expenses ordered by their expense date in descending order (most recent dates first), matching user expectations. The existing test was updated to assert on `date` ordering rather than `created_at` ordering.

---

### BONUS-001: Prevent Future Date Expense Creation

#### Problem

Users could select any date in the future when creating an expense, which doesn't make sense for expense tracking (you can't have spent money on a future date).

#### Solution

Added validation on both the backend and frontend to prevent future date expense creation:

- **Backend**: Added a custom validation `date_cannot_be_in_the_future` in the `Expense` model that rejects any expense with a date later than `Date.current`.
- **Frontend**: Added future date validation in the `useExpenseForm` hook and set the `max` attribute on the date input to today's date.

#### Files Changed

- `backend/app/models/expense.rb`
- `frontend/src/hooks/useExpenseForm.ts`
- `frontend/src/components/ExpenseForm.tsx`
- `backend/spec/models/expense_spec.rb`
- `backend/spec/requests/api/expenses_spec.rb`

#### Notes

The date picker now prevents selecting future dates via the HTML `max` attribute, and the form validation provides a clear error message if a future date is somehow entered. The backend serves as the final guard to ensure data integrity regardless of frontend validation.
