export default function TestEnv() {
  return (
    <pre>
      {process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "NO API KEY"}
    </pre>
  );
}