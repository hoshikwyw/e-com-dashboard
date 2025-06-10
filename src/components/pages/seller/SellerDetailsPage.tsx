import BreadCrumb from "@/components/common/BreadCrumb";
import ProfileDetailCard from "@/components/common/ProfileDetailCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DockIcon, Trash2, X } from "lucide-react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

// Mock data - in a real app this would come from an API
const mockSeller = {
  id: "123",
  name: "John Doe",
  email: "john.doe@example.com",
  phoneNo: "+1 (555) 123-4567",
  address: "123 Main St, Anytown, USA",
  status: "Active",
  itemStock: 42,
  sellsNo: 128,
  joinDate: "2023-01-15",
  lastActivity: "2023-06-10",
  rating: 4.7,
  bio: "Professional seller with 5 years of experience in high-quality products.",
  products: [
    { id: "p1", name: "Premium Widget", price: 29.99, stock: 15, sales: 42 },
    { id: "p2", name: "Deluxe Gadget", price: 49.99, stock: 8, sales: 23 },
    { id: "p3", name: "Basic Thingamajig", price: 12.99, stock: 19, sales: 63 },
  ],
  orders: [
    { id: "o1", date: "2023-05-15", amount: 89.97, status: "Completed" },
    { id: "o2", date: "2023-06-01", amount: 49.99, status: "Shipped" },
    { id: "o3", date: "2023-06-08", amount: 64.98, status: "Processing" },
  ],
};

const SellerDetailPage = () => {
  //   const sellerId = params.id;
  const { id } = useParams();
  const navigate = useNavigate();
  // In a real app, you would fetch the seller data here using the sellerId
  // const { data: seller, isLoading, error } = useGetSellerQuery(sellerId);

  const handleEditSeller = () => {
    console.log("Editing seller:", id);
    // Navigate to edit page or open modal
    // navigate(`/sellers/${id}/edit`);
  };

  const handleDeleteSeller = async () => {
    console.log("Deleting seller:", id);
    // Call delete API and then redirect to sellers list
    // await deleteSeller(id);
    navigate("/sellers");
  };
  return (
    <div className="w-full h-full">
      <div className="w-full flex items-end justify-between mb-6">
        <div>
          <div className="flex items-center gap-4">
            <h1 className="pageTitle">Seller Details</h1>
          </div>
          <BreadCrumb />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleEditSeller}>
            <X className="mr-2 h-4 w-4" /> Cancel
          </Button>
          <Button variant="secondary" onClick={handleEditSeller}>
            <Trash2 className="mr-2 h-4 w-4" /> Delete
          </Button>
          <Button variant="default" onClick={handleDeleteSeller}>
            <DockIcon className="mr-2 h-4 w-4" /> Save
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-8 gap-6 mb-6">
        <div className=" col-span-3">
          <ProfileDetailCard
            id={123}
            name="John Doe"
            status="active"
            phone="050 414 8778"
            email="lindablair@mail.com"
            address="1833 Bel Meadow Drive, Fontana, California 92335, USA"
            verified
          />
        </div>

        {/* Main Content Area */}
        <div className="md:col-span-5 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Products
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {mockSeller.products.length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Items in Stock
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockSeller.itemStock}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Sales
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockSeller.sellsNo}</div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="products" className="w-full">
            <TabsList>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="orders">Recent Orders</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>
            <TabsContent value="products">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {mockSeller.products.map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div>
                          <h4 className="font-medium">{product.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            ${product.price.toFixed(2)}
                          </p>
                        </div>
                        <div className="flex gap-4">
                          <span className="text-sm">
                            Stock: {product.stock}
                          </span>
                          <span className="text-sm">
                            Sales: {product.sales}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="orders">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {mockSeller.orders.map((order) => (
                      <div
                        key={order.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div>
                          <h4 className="font-medium">Order #{order.id}</h4>
                          <p className="text-sm text-muted-foreground">
                            {order.date}
                          </p>
                        </div>
                        <div className="flex gap-4">
                          <span className="font-medium">
                            ${order.amount.toFixed(2)}
                          </span>
                          <span
                            className={`text-sm ${
                              order.status === "Completed"
                                ? "text-green-600"
                                : order.status === "Shipped"
                                ? "text-blue-600"
                                : "text-yellow-600"
                            }`}
                          >
                            {order.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="activity">
              <Card>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground">
                    Activity log will appear here
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default SellerDetailPage;
