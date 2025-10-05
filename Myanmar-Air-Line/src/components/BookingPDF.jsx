import { PDFDownloadLink, Document, Page, Text } from '@react-pdf/renderer';

function BookingPDF({ bookingDetail, formData }) {
  const departureCity = formData.departureCity || "Unknown City";
  const arrivalCity = formData.arrivalCity || "Unknown City";
  console.log("BookingPDF props:", { bookingDetail, formData });
  const MyDocument = (
    <Document>
      <Page size="A4">
        <Text>Booking Confirmation</Text>
        <Text>Airline: {bookingDetail.airlinename}</Text>
        <Text>Flight Number: {bookingDetail.flight_number}</Text>
        <Text>From: {departureCity}</Text>
        <Text>To: {arrivalCity}</Text>
      </Page>
    </Document>
  );

  return (
    <PDFDownloadLink document={MyDocument} fileName="booking-detail.pdf">
      {({ loading }) => 
        loading ? "Generating PDF..." : 
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
          Download Booking PDF
        </button>
      }
    </PDFDownloadLink>
  );
}

export default BookingPDF;
