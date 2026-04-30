import { PageShell } from "../components";
import { AdminDashboard } from "./admin-dashboard";

export default function Admin() {
  return (
    <PageShell>
      <main className="section">
        <div className="container" style={{ maxWidth: 1120 }}>
          <AdminDashboard />
        </div>
      </main>
    </PageShell>
  );
}
