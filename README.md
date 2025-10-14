# 🧩 Towers of Hanoi Backend (Next.js + TypeScript)

This is the backend logic for the **Towers of Hanoi Visualizer (Overseer)**, built using **Next.js** and **TypeScript**.  
It computes all steps (snapshots) of the puzzle and exposes them through a simple API route that can be consumed by the frontend visualizer.

---

## 🚀 Features

- Recursive Hanoi solver written in TypeScript
- MVC-inspired structure (Models, Controllers)
- JSON-based API endpoint
- Ready to integrate with any React/Next.js frontend

---

## 📁 Folder Structure

```
project-root/
│
├─ controllers/
│  └─ HanoiController.ts      # Main solver logic
│
├─ models/
│  ├─ Disk.ts                 # Represents a disk
│  ├─ DiskPole.ts             # Represents a pole
│  ├─ PoleCollection.ts       # Holds all poles
│  └─ Overseer.ts             # Records every snapshot (state)
│
├─ pages/
│  └─ api/
│     └─ hanoi.ts             # API route that runs the solver
│
├─ package.json
├─ tsconfig.json
└─ README.md
```

---

## ⚙️ Setup Instructions

1. **Clone or open your Next.js app**

   ```bash
   git clone https://github.com/Emagjby/towers-of-hanoi-next
   cd towers-of-hanoi-next
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. **Test the backend**
   Open your browser and visit:
   ```
   http://localhost:3000/api/hanoi?diskCount=3&from=1&to=3
   ```
   You’ll get a JSON response containing all the moves (snapshots).

---

## 🧠 How It Works

1. The **HanoiController** takes `diskCount`, `from`, and `to` parameters.
2. It initializes three poles and generates all the puzzle moves using recursion.
3. The **Overseer** records a snapshot of the poles after each move.
4. The API route (`/api/hanoi`) returns all snapshots as JSON for the frontend visualizer.

---

## 🔗 Example API Response

```json
{
  "snapshots": [
    {
      "poles": [
        {
          "index": 1,
          "name": "A",
          "stack": [{ "weight": 3 }, { "weight": 2 }, { "weight": 1 }]
        },
        { "index": 2, "name": "B", "stack": [] },
        { "index": 3, "name": "C", "stack": [] }
      ]
    },
    {
      "poles": [
        {
          "index": 1,
          "name": "A",
          "stack": [{ "weight": 3 }, { "weight": 2 }]
        },
        { "index": 2, "name": "B", "stack": [] },
        { "index": 3, "name": "C", "stack": [{ "weight": 1 }] }
      ]
    },
    {
      "poles": [
        { "index": 1, "name": "A", "stack": [{ "weight": 3 }] },
        { "index": 2, "name": "B", "stack": [{ "weight": 2 }] },
        { "index": 3, "name": "C", "stack": [{ "weight": 1 }] }
      ]
    },
    {
      "poles": [
        { "index": 1, "name": "A", "stack": [{ "weight": 3 }] },
        {
          "index": 2,
          "name": "B",
          "stack": [{ "weight": 2 }, { "weight": 1 }]
        },
        { "index": 3, "name": "C", "stack": [] }
      ]
    },
    {
      "poles": [
        { "index": 1, "name": "A", "stack": [] },
        {
          "index": 2,
          "name": "B",
          "stack": [{ "weight": 2 }, { "weight": 1 }]
        },
        { "index": 3, "name": "C", "stack": [{ "weight": 3 }] }
      ]
    },
    {
      "poles": [
        { "index": 1, "name": "A", "stack": [{ "weight": 1 }] },
        { "index": 2, "name": "B", "stack": [{ "weight": 2 }] },
        { "index": 3, "name": "C", "stack": [{ "weight": 3 }] }
      ]
    },
    {
      "poles": [
        { "index": 1, "name": "A", "stack": [{ "weight": 1 }] },
        { "index": 2, "name": "B", "stack": [] },
        { "index": 3, "name": "C", "stack": [{ "weight": 3 }, { "weight": 2 }] }
      ]
    },
    {
      "poles": [
        { "index": 1, "name": "A", "stack": [] },
        { "index": 2, "name": "B", "stack": [] },
        {
          "index": 3,
          "name": "C",
          "stack": [{ "weight": 3 }, { "weight": 2 }, { "weight": 1 }]
        }
      ]
    }
  ]
}
```

---

## 🧩 Future Plans

- Add visual frontend (Overseer visualizer)
- Animate moves step-by-step
- Add user controls (speed, direction, reset)

---

## 🧑‍💻 Author

**GenchoXD**

---

> “The Overseer watches every move — nothing escapes its sight.” 👁️
