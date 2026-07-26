import { useState } from "react";
import {
  DEFAULT_EMOJI_CATEGORY,
  DEFAULT_ITEM_EMOJI,
  EMOJI_CATEGORIES,
  ITEM_NAME_PLACEHOLDER,
  ITEM_PRICE_PLACEHOLDER,
} from "../constants";

function AddItemModal({ open, onClose, onAdd }) {
  const [emoji, setEmoji] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [emojiCategory, setEmojiCategory] = useState(DEFAULT_EMOJI_CATEGORY);

  if (!open) return null;

  const parsedPrice = parseFloat(price);
  const isValid = name.trim().length > 0 && !isNaN(parsedPrice) && parsedPrice > 0;

  const reset = () => {
    setEmoji("");
    setName("");
    setPrice("");
    setShowEmojiPicker(false);
    setEmojiCategory(DEFAULT_EMOJI_CATEGORY);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;
    onAdd({ emoji: emoji.trim() || DEFAULT_ITEM_EMOJI, name: name.trim(), price: parsedPrice });
    reset();
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-container-margin"
      onClick={handleClose}
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-lg w-full max-w-sm p-card-padding"
      >
        <h2 className="font-headline-md text-headline-md mb-4">Add Item</h2>

        <div className="space-y-4">
          <div>
            <label className="font-label-bold text-label-bold uppercase text-on-surface-variant block mb-1">
              Emoji
            </label>
            <input
              type="text"
              value={emoji}
              readOnly
              onClick={() => setShowEmojiPicker((prev) => !prev)}
              placeholder=""
              maxLength={4}
              className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 text-2xl text-center cursor-pointer focus:outline-none focus:border-secondary"
            />
            {showEmojiPicker && (
              <div className="mt-2 p-2 bg-surface-container-low border border-outline-variant rounded-lg">
                <div className="flex gap-2 mb-2">
                  {Object.keys(EMOJI_CATEGORIES).map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setEmojiCategory(category)}
                      className={`flex-1 rounded-md py-1 font-label-bold text-label-bold uppercase transition-colors ${
                        emojiCategory === category
                          ? "bg-secondary text-on-primary"
                          : "hover:bg-surface-container"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
                <div className="grid grid-cols-6 gap-2 max-h-40 overflow-y-auto">
                  {EMOJI_CATEGORIES[emojiCategory].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => {
                        setEmoji(option);
                        setShowEmojiPicker(false);
                      }}
                      className="text-xl rounded-md py-1 hover:bg-surface-container transition-colors"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="font-label-bold text-label-bold uppercase text-on-surface-variant block mb-1">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={ITEM_NAME_PLACEHOLDER}
              data-testid="item-name-input"
              className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 font-body-md focus:outline-none focus:border-secondary"
            />
          </div>

          <div>
            <label className="font-label-bold text-label-bold uppercase text-on-surface-variant block mb-1">
              Price
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder={ITEM_PRICE_PLACEHOLDER}
              data-testid="item-price-input"
              className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 font-data-mono text-data-mono focus:outline-none focus:border-secondary"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            type="button"
            onClick={handleClose}
            className="flex-1 border border-outline-variant rounded-xl py-3 font-label-bold text-label-bold uppercase hover:bg-surface-container-low transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!isValid}
            data-testid="add-item-submit"
            className="flex-1 bg-primary text-on-primary rounded-xl py-3 font-label-bold text-label-bold uppercase disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98] transition-transform"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddItemModal;
