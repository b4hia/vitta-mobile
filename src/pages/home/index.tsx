import { AdminDashboard } from "@/components/Home/Dashboard"
import PatientDashboard from "@/components/Home/Dashboard/patient"
import { useAuth } from "@/contexts/auth"

export default function HomeScreen() {
    const { user } = useAuth()
    const isAdmin = ["SYSTEM_ADMIN", "ADMIN", "CLINIC_ADMIN"].includes(user?.activeRole || "")
    if (isAdmin) {
        return <AdminDashboard />
    }
    return <PatientDashboard />
}
