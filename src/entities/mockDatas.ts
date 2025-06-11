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

interface SellerTableDataItem {
  id: number;
  productName: string;
  productPhoto: string;
  productCategory: string;
  status: "in stock" | "low stock" | "out of stock";
  date: string;
}

export function generateSellerTableData(length: number): SellerTableDataItem[] {
  const productNames = [
    "Smartphone X",
    "Wireless Earbuds Pro",
    "4K Ultra HD TV",
    "Laptop EliteBook",
    "Smart Watch Series 5",
    "Bluetooth Speaker",
    "Gaming Keyboard",
    "Noise Cancelling Headphones",
    "Fitness Tracker",
    "Tablet Pro",
    "Digital Camera",
    "External SSD 1TB",
    "Wireless Charger",
    "Smart Home Hub",
    "VR Headset",
  ];

  const categories = [
    "Electronics",
    "Computers",
    "Home Appliances",
    "Wearables",
    "Audio",
    "Photography",
    "Storage",
    "Accessories",
  ];

  const photoUrls = [
    "https://example.com/products/smartphone.jpg",
    "https://example.com/products/earbuds.jpg",
    "https://example.com/products/tv.jpg",
    "https://example.com/products/laptop.jpg",
    "https://example.com/products/watch.jpg",
    "https://example.com/products/speaker.jpg",
    "https://example.com/products/keyboard.jpg",
    "https://example.com/products/headphones.jpg",
    "https://example.com/products/tracker.jpg",
    "https://example.com/products/tablet.jpg",
    "https://example.com/products/camera.jpg",
    "https://example.com/products/ssd.jpg",
    "https://example.com/products/charger.jpg",
    "https://example.com/products/hub.jpg",
    "https://example.com/products/vr.jpg",
  ];

  // Generate random dates within the last year
  const getRandomDate = () => {
    const start = new Date();
    start.setFullYear(start.getFullYear() - 1);
    const end = new Date();
    const date = new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
    return date.toISOString().split("T")[0]; // Format as YYYY-MM-DD
  };

  return Array.from({ length }, (_, i) => {
    const productName =
      productNames[Math.floor(Math.random() * productNames.length)];
    const statusRand = Math.random();
    let status: "in stock" | "low stock" | "out of stock";

    if (statusRand > 0.7) {
      status = "out of stock";
    } else if (statusRand > 0.4) {
      status = "low stock";
    } else {
      status = "in stock";
    }

    return {
      id: i + 100000,
      productName: productName,
      productPhoto: photoUrls[Math.floor(Math.random() * photoUrls.length)],
      productCategory:
        categories[Math.floor(Math.random() * categories.length)],
      status: status,
      date: getRandomDate(),
    };
  });
}
