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
import { gethotel, deleteHotel } from "@/api"; // ✅ only import once
import Loader from "../Loader";

const HotelList = ({ onSelect }: any) => {
  const [hotel, setHotel] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ moved outside to avoid redefinition
  const fetchHotel = async () => {
    try {
      const data = await gethotel();
      setHotel(data);
    } catch (error) {
      console.error("Error fetching hotel list:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotel();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this hotel?");
    if (!confirmDelete) return;

    try {
      await deleteHotel(id);
      fetchHotel(); // ✅ Refresh list after deletion
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  if (loading) return <Loader />;

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Hotel List</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-black">Hotel Name</TableHead>
            <TableHead className="text-black">Location</TableHead>
            <TableHead className="text-black">Price/Night</TableHead>
            <TableHead className="text-black">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {hotel.length > 0 ? (
            hotel.map((hotel: any) => (
              <TableRow key={hotel._id}>
                <TableCell>{hotel.hotelName}</TableCell>
                <TableCell>{hotel.location}</TableCell>
                <TableCell>₹{hotel.pricePerNight}</TableCell>
                <TableCell className="flex gap-2">
                  <Button onClick={() => onSelect(hotel)}>Edit</Button>
                  <Button variant="destructive" onClick={() => handleDelete(hotel.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center">No data</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default HotelList;
