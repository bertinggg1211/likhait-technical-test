require 'rails_helper'

RSpec.describe Expense, type: :model do
  it "is valid with a future date" do
    category = Category.create!(name: "Food")
    expense = Expense.new(
      description: "Test",
      amount: 10.00,
      category: category,
      date: Date.current,
      payer_name: "Test"
    )
    expect(expense).to be_valid
  end

  it "is invalid with a future date" do
    category = Category.create!(name: "Food")
    expense = Expense.new(
      description: "Test",
      amount: 10.00,
      category: category,
      date: Date.current + 1.day,
      payer_name: "Test"
    )
    expect(expense).not_to be_valid
    expect(expense.errors[:date]).to include("cannot be in the future")
  end
end
