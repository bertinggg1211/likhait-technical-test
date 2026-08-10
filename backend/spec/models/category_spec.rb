require 'rails_helper'

RSpec.describe Category, type: :model do
  it "is valid with a name" do
    expect(Category.new(name: "Food")).to be_valid
  end

  it "is invalid without a name" do
    expect(Category.new(name: nil)).not_to be_valid
  end

  it "is invalid with a duplicate name" do
    Category.create!(name: "Food")
    expect(Category.new(name: "Food")).not_to be_valid
  end
end
