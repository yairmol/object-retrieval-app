# Object Retrieval App
A [Next.js](https://nextjs.org) project for displaying the results of text or image based
object retrieval

## Getting Started

First run the demo api that returns constant results:
```bash
pip install fastapi uvicorn
uvicorn demo_api:app --reload --port 5000
```

Then, run the development server for the app:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
