# 🎨 Where to Update Layouts and Colors

This guide shows you exactly where to modify colors, layouts, and styling in the application.

---

## 📍 Main Files for Styling

### 1. **Theme Configuration** (Primary Location) ⭐

**File**: `hostel-mess-frontend/src/theme/theme.js`

This is the **main file** for all color and design customization. It controls:

- **Colors** (primary, secondary, success, error, etc.)
- **Typography** (fonts, sizes, weights)
- **Component styles** (buttons, cards, inputs, etc.)
- **Global theme settings**

**What to edit:**

```javascript
// Colors - Lines 4-60
const colors = {
  primary: {
    main: '#2563eb',  // ← Change primary color here
    light: '#3b82f6',
    dark: '#1d4ed8',
  },
  background: {
    default: '#f8fafc',  // ← Change page background
    paper: '#ffffff',     // ← Change card/paper background
  },
  // ... more colors
};

// Typography - Lines 62-142
const typography = {
  fontFamily: '"Inter", ...',  // ← Change font family
  // ... font sizes, weights
};

// Component Styles - Lines 144-243
const components = {
  MuiButton: { ... },      // ← Button styles
  MuiCard: { ... },        // ← Card styles
  MuiTextField: { ... },   // ← Input field styles
  // ... more components
};
```

**Quick Color Changes:**

- Primary color: Change `colors.primary.main` (line 6)
- Background: Change `colors.background.default` (line 50)
- Text color: Change `colors.text.primary` (line 56)

---

### 2. **Global CSS** (Global Styles)

**File**: `hostel-mess-frontend/src/index.css`

Controls global CSS that affects the entire app:

- Body background color
- Scrollbar styling
- Text selection colors
- Global font settings

**What to edit:**

```css
/* Line 23 - Page background */
body {
  background-color: #f8fafc; /* ← Change global background */
  color: #1f2937; /* ← Change default text color */
}

/* Lines 38-56 - Scrollbar colors */
::-webkit-scrollbar-thumb {
  background: #cbd5e1; /* ← Change scrollbar color */
}

/* Lines 59-67 - Text selection color */
::selection {
  background-color: #2563eb; /* ← Change selection highlight */
}
```

---

### 3. **Layout Components**

#### Student Layout

**File**: `hostel-mess-frontend/src/layouts/StudentLayout.jsx`

- Controls overall student page structure
- Sidebar width, spacing, layout

#### Admin Layout

**File**: `hostel-mess-frontend/src/admin/AdminLayout.jsx`

- Controls overall admin page structure

#### Student Sidebar

**File**: `hostel-mess-frontend/src/components/StudentSidebar.jsx`

- Sidebar background, colors, menu styles
- Line 105-117: Header gradient color
- Line 129-173: User profile section styling

#### Admin Sidebar

**File**: `hostel-mess-frontend/src/admin/components/AdminSidebar.jsx`

- Admin sidebar styling

#### Student Topbar

**File**: `hostel-mess-frontend/src/components/StudentTopbar.jsx`

- Top navigation bar colors and layout

---

## 🎨 Quick Reference: Color Locations

### Primary Color (Main Brand Color)

- **Theme**: `hostel-mess-frontend/src/theme/theme.js` → Line 6
- **Used in**: Buttons, links, active states, highlights

### Background Colors

- **Page Background**: `theme.js` → Line 50 (`background.default`)
- **Card/Paper Background**: `theme.js` → Line 51 (`background.paper`)
- **Sidebar Background**: `theme.js` → Line 53 (`background.sidebar`)

### Text Colors

- **Primary Text**: `theme.js` → Line 56 (`text.primary`)
- **Secondary Text**: `theme.js` → Line 57 (`text.secondary`)

### Status Colors

- **Success/Green**: `theme.js` → Line 17 (`success.main`)
- **Error/Red**: `theme.js` → Line 27 (`error.main`)
- **Warning/Amber**: `theme.js` → Line 22 (`warning.main`)
- **Info/Blue**: `theme.js` → Line 32 (`info.main`)

---

## 📐 Layout Customization

### Sidebar Width

- **Student Sidebar**: `hostel-mess-frontend/src/components/StudentSidebar.jsx` → Line 50 (`DRAWER_WIDTH = 280`)
- **Admin Sidebar**: `hostel-mess-frontend/src/admin/AdminLayout.jsx` → Line 54 (`DRAWER_WIDTH = 240`)

### Page Padding/Spacing

- **Student Layout**: `StudentLayout.jsx` → Line 60-66 (padding values)
- **Admin Layout**: `AdminLayout.jsx` → Line 341-347 (padding values)

### Card Border Radius

- **Theme**: `theme.js` → Line 174 (`borderRadius: 12`)
- **Individual Cards**: Each component file's `sx` prop

---

## 🔧 How to Make Changes

### Example 1: Change Primary Color to Green

1. Open `hostel-mess-frontend/src/theme/theme.js`
2. Find line 6:
   ```javascript
   main: '#2563eb', // Blue
   ```
3. Change to:
   ```javascript
   main: '#10b981', // Green
   ```
4. Save file
5. Frontend will auto-reload (if running with `npm start`)

### Example 2: Change Page Background to Dark

1. Open `hostel-mess-frontend/src/theme/theme.js`
2. Find line 50:
   ```javascript
   default: '#f8fafc', // Light gray
   ```
3. Change to:
   ```javascript
   default: '#1f2937', // Dark gray
   ```
4. Also update text color (line 56) for visibility:
   ```javascript
   primary: '#ffffff', // White text
   ```

### Example 3: Change Sidebar Width

1. Open `hostel-mess-frontend/src/components/StudentSidebar.jsx`
2. Find line 50:
   ```javascript
   const DRAWER_WIDTH = 280;
   ```
3. Change to:
   ```javascript
   const DRAWER_WIDTH = 300; // Wider sidebar
   ```

### Example 4: Change Card Border Radius

1. Open `hostel-mess-frontend/src/theme/theme.js`
2. Find line 174:
   ```javascript
   borderRadius: 12,
   ```
3. Change to:
   ```javascript
   borderRadius: 20, // More rounded
   ```

---

## 🎯 Component-Level Styling

Individual components use Material-UI's `sx` prop for custom styling:

### Where to Find Component Styles

- **Dashboard**: `hostel-mess-frontend/src/features/dashboard/StudentDashboard.jsx`
- **Login Page**: `hostel-mess-frontend/src/auth/LoginForm.jsx`
- **Forms**: Each component in `features/` folder
- **Admin Pages**: Files in `hostel-mess-frontend/src/admin/` folder

**Example - Changing a specific card:**

```javascript
<Card sx={{
  borderRadius: 3,        // ← Change border radius
  backgroundColor: 'red',  // ← Change background
  p: 3                    // ← Change padding
}}>
```

---

## 🎨 Color Palette Reference

Current theme colors (in `theme.js`):

| Color            | Hex Code  | Usage                              |
| ---------------- | --------- | ---------------------------------- |
| Primary Blue     | `#2563eb` | Buttons, links, active states      |
| Secondary Amber  | `#f59e0b` | Accents, highlights                |
| Success Green    | `#10b981` | Success messages, positive actions |
| Error Red        | `#ef4444` | Errors, warnings                   |
| Background Light | `#f8fafc` | Page background                    |
| Text Primary     | `#1f2937` | Main text color                    |
| Text Secondary   | `#6b7280` | Secondary text                     |

---

## 📝 Tips

1. **Test Changes**: After editing `theme.js`, save and check if frontend auto-reloads
2. **Use Material-UI Colors**: The theme uses Material-UI color system - you can use their palette
3. **Consistent Colors**: Always use theme colors via `theme.palette.colorName.main` in components
4. **Responsive**: Most layouts use Material-UI breakpoints (`xs`, `sm`, `md`, `lg`)

---

## 🔍 Finding Specific Styles

**To find where a specific element is styled:**

1. **Right-click** on the element in browser → **Inspect**
2. Look at the **class names** or **sx prop values**
3. Search for that class/style in the component file
4. Or search in `theme.js` for Material-UI component overrides

**Example:**

- See a button that needs changing? Search for `<Button` in component files
- Want to change all buttons? Edit `MuiButton` in `theme.js` (line 146)

---

## 📂 File Structure Summary

```
hostel-mess-frontend/src/
├── theme/
│   └── theme.js              ⭐ MAIN THEME FILE (Colors, Typography)
├── index.css                 ⭐ GLOBAL CSS (Body, scrollbars)
├── layouts/
│   └── StudentLayout.jsx      Layout structure
├── components/
│   ├── StudentSidebar.jsx    Sidebar styling
│   └── StudentTopbar.jsx      Topbar styling
└── admin/
    └── AdminLayout.jsx       Admin layout
```

---

**Most Important**: Start with `theme.js` for global color changes! 🎨
