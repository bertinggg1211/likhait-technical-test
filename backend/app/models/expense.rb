class Expense < ApplicationRecord
  belongs_to :category

  validate :date_cannot_be_in_the_future

  private

  def date_cannot_be_in_the_future
    return if date.nil?

    if date > Date.current
      errors.add(:date, "cannot be in the future")
    end
  end
end
