import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { getflight, deleteflight } from "@/api"; // ✅ Import deleteflight
import Loader from "../Loader";

const FlightList = ({ onSelect }: any) => {
  const [flight, setflight] = useState<any[]>([]);
  const [loading, setloading] = useState(true);

  const fetchflight = async () => {
    try {
      const data = await getflight();
      setflight(data);
    } catch (error) {
      console.error(error);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    fetchflight();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this flight?");
    if (!confirmDelete) return;

    try {
      await deleteflight(id);
      fetchflight(); // Refresh list after deletion
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Flight List</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-black">Flight Name</TableHead>
            <TableHead className="text-black">From</TableHead>
            <TableHead className="text-black">To</TableHead>
            <TableHead className="text-black">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {flight.length > 0 ? (
            flight.map((flight: any) => (
              <TableRow key={flight._id}>
                <TableCell>{flight.flightName}</TableCell>
                <TableCell>{flight.from}</TableCell>
                <TableCell>{flight.to}</TableCell>
                <TableCell className="flex gap-2">
                  <Button onClick={() => onSelect(flight)}>Edit</Button>
                  <Button variant="destructive" onClick={() => handleDelete(flight.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4}>No data</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default FlightList;