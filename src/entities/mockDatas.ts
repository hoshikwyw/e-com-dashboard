interface MockDataItem {
  id: number;
  name: string;
  status: "active" | "inactive";
  itemStock: number;
  sellsNo: string;
  phoneNo: string;
  email: string;
  address: string;
}

export function generateMockSellersData(length: number): MockDataItem[] {
  const names = [
    "John Smith",
    "Jane Johnson",
    "Robert Williams",
    "Emily Brown",
    "Michael Jones",
    "Sarah Miller",
    "David Davis",
    "Lisa Garcia",
    "James Rodriguez",
    "Emma Wilson",
    "William Taylor",
    "Olivia Martinez",
    "Benjamin Anderson",
    "Sophia Thomas",
    "Daniel Hernandez",
  ];

  const addresses = [
    "123 Main St, New York, NY 10001",
    "456 Oak Ave, Los Angeles, CA 90001",
    "789 Pine Rd, Chicago, IL 60601",
    "321 Elm St, Houston, TX 77001",
    "654 Maple Dr, Phoenix, AZ 85001",
    "987 Cedar Ln, Philadelphia, PA 19101",
    "135 Birch Way, San Antonio, TX 78201",
    "246 Spruce Ct, San Diego, CA 92101",
    "864 Willow Blvd, Dallas, TX 75201",
    "975 Aspen Cir, San Jose, CA 95101",
  ];

  return Array.from({ length }, (_, i) => {
    const name = names[Math.floor(Math.random() * names.length)];
    const [firstName, lastName] = name.split(" ");
    const address = addresses[Math.floor(Math.random() * addresses.length)];

    return {
      id: i + 1,
      name: name,
      status: Math.random() > 0.3 ? "active" : "inactive",
      itemStock: Math.floor(Math.random() * 1000),
      sellsNo: `${Math.floor(Math.random() * 500)}`,
      phoneNo: `(${Math.floor(Math.random() * 900) + 100}) ${
        Math.floor(Math.random() * 900) + 100
      }-${Math.floor(Math.random() * 9000) + 1000}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
      address: address,
    };
  });
}
