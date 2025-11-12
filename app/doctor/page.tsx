import { redirect } from "next/navigation";


export default function DoctorPage() {
  return (
    redirect('/doctor/dashboard')
  );
}
