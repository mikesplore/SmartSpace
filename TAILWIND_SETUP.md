# Tailwind CSS Setup

This project uses Tailwind CSS v4.1.11 with the updated PostCSS configuration.

## Important Notes

- **Tailwind v4 Configuration**: Tailwind CSS v4 requires using `@tailwindcss/postcss` instead of directly using `tailwindcss` in the PostCSS config.
- **Custom Theme**: The project includes a custom theme with:
  - Inter font as the primary font
  - Custom primary color palette
  - Custom box-shadow utilities
  - Dark mode support (class-based)

## VS Code Setup

For the best developer experience, make sure you have these VS Code extensions installed:
- Tailwind CSS IntelliSense
- PostCSS Language Support

## Usage

### Basic Utilities
```jsx
<div className="text-primary-600 bg-white p-4 rounded-lg shadow-subtle">
  Content
</div>
```

### Dark Mode
```jsx
<div className="bg-white text-gray-900 dark:bg-gray-800 dark:text-white">
  This will change appearance in dark mode
</div>
```

### Custom Components
The project includes several custom component classes:
```jsx
<button className="btn-primary">Primary Button</button>
<button className="btn-secondary">Secondary Button</button>
<div className="card">Card Container</div>
<input className="form-input" />
<label className="form-label">Label</label>
```

## Configuration Files

- `tailwind.config.js` - Tailwind configuration
- `postcss.config.js` - PostCSS configuration using `@tailwindcss/postcss`
- `.vscode/settings.json` - VS Code settings for Tailwind

## Troubleshooting

If you encounter issues:
1. Make sure you have the latest dependencies installed (`npm install`)
2. Check that `postcss.config.js` is using `@tailwindcss/postcss` instead of `tailwindcss`
3. Restart the development server (`npm run dev`)
