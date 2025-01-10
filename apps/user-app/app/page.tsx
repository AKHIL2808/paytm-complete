import { Suspense } from "react";
import { AppbarClient } from "../components/Appbarclient";

export default function Home() {
  return (
    <div>
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <AppbarClient />
        </Suspense>
      </div>
      hello
    </div>
  );
}
