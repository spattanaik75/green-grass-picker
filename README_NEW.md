# 🌱 Green Grass Picker

A beautiful, modern web application to help you find your perfect city to live in based on your personalized preferences!

## ✨ Features

### Stage 1 (Completed) ✅
- **Drag & Drop Preferences**: Intuitive vertical list to rank your priorities
- **Smart Scoring System**: Cities are ranked based on weighted preferences (Top 3 get higher weights)
- **Beautiful Color Gradients**: Green-to-red color coding for easy visual comparison
- **Material UI Design**: Clean, modern interface with soothing pastel colors
- **Modular Architecture**: Well-organized, maintainable code structure

### Stage 2 (Completed) ✅
- **JSON Data Source**: Cities and criteria loaded from external data file for easy updates
- **Expanded Criteria**: 13 criteria including:
  - Weather, Work-Life Balance, Safety
  - Things to Do, Savings/Cost, Remote Work
  - Living Space, Work Stress
  - Proximity to Family, Academia for Children
  - Taxation, Government Facilities, Career Growth
  
- **More Cities**: 13 cities across the globe:
  - Johannesburg, Lisbon, Valencia, Auckland, Brisbane
  - Southern France, Tuscany, Singapore, Bangalore
  - Dubai, London, Amsterdam, San Francisco
  
- **User Personalization**:
  - Current location input
  - Home location input
  - Children status (affects academia weightage)
  - Net savings tracking
  
- **Dynamic Column Ordering**: Table reorganizes based on your preference order
- **Sortable Columns**: Click any column header to sort cities by that metric
- **Mobile-Responsive**: Beautiful card-based layout on mobile, table on desktop
- **Smooth Animations**: Delightful transitions and hover effects throughout

## 🎨 Design Highlights

- **Pastel Color Palette**: Soothing teal and pink gradients
- **Custom Typography**: Nunito font for a friendly, modern look
- **Gradient Backgrounds**: Beautiful multi-color gradients for visual appeal
- **Card-Based Mobile UI**: Optimized for touch interactions on mobile devices
- **Priority Badges**: Visual indicators for top 3 preferences
- **Interactive Elements**: Hover effects, smooth transitions, and micro-interactions

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 🛠️ Tech Stack

- **React 18** with TypeScript
- **Material UI (MUI)** for components and theming
- **@hello-pangea/dnd** for drag & drop functionality
- **Vite** for blazing fast development
- **Emotion** for CSS-in-JS styling

## 📱 Responsive Design

The app adapts beautifully across devices:
- **Desktop**: Full table view with sortable columns
- **Tablet**: Optimized spacing and layout
- **Mobile**: Card-based layout for easy scrolling

## 🎯 Coming Soon (Stage 3)

- Firebase Google Authentication
- City comparison feature
- Save and share your preferences
- Historical tracking of your rankings

## 📁 Project Structure

```
src/
├── components/
│   ├── CityRankingTable.tsx    # Beautiful, sortable table with color gradients
│   ├── PreferenceSelector.tsx   # Drag & drop preference ranking
│   └── UserInputForm.tsx        # Collapsible user input form
├── data.json                    # City and criteria data
├── theme.ts                     # Material UI custom theme
├── App.tsx                      # Main application component
└── main.tsx                     # Application entry point
```

## 🤝 Contributing

Feel free to open issues or submit pull requests!

## 📄 License

MIT

---

Made with ❤️ and lots of ☕
