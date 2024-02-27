"use client";

import { Checkbox } from "@/components/ui/checkbox";
import DateColumn from "@/components/DataTableColumns/DateColumn";
import ImageColumn from "@/components/DataTableColumns/ImageColumn";
import SortableColumn from "@/components/DataTableColumns/SortableColumn";
import ActionColumn from "@/components/DataTableColumns/ActionColumn";
import { useState } from "react";
import Modal, { closeStyle } from "simple-react-modal";
import toast from "react-hot-toast";
import axios from "axios";
import "simple-react-modal/dist/simple-react-modal.css";
import Image from "next/image";
import ImageGallery from "@/components/cards/ImageGallery";
import { Button } from "flowbite-react";
const customModalOverlayClass = "custom-modal-overlay";
export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => <SortableColumn column={column} title="Name" />,
  },
  // {
  //   accessorKey: "profileImageUrl",
  //   header: "Profile Image",
  //   cell: ({ row }) => <ImageColumn row={row} accessorKey="profileImageUrl" />,
  // },
  {
    accessorKey: "email",
    header: "Email",
  },
  // {
  //   accessorKey: "role",
  //   header: "Role",
  // },
  {
    accessorKey: "emailVerified",
    header: "Verified",
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
    cell: ({ row }) => <DateColumn row={row} accessorKey="createdAt" />,
  },
  {
    id: "view",
    header: "Actions",
    cell: async ({ row }) => {
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [farm, setFarm] = useState({});
      const farmer = row.original;
      console.log(farmer);

      const openModal = async () => {
        try {
          const response = await axios
            .get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/farm/${farmer.id}`)
            .then((res) => {
              setFarm(res.data);
              setIsModalOpen(true);
            })
            .catch((err) => {
              if (err.response.status === 404) {
                toast.error("No certificates found for this farmer");
              } else {
                toast.error(`Something went wrong ${err}`);
              }
            });
          console.log(response);
        } catch (err) {
          toast.error(`Something went wrong ${err}`);
        }
      };

      const closeModal = () => {
        setIsModalOpen(false);
      };

      const acceptFarm = async (id) => {
        try {
          const response = await axios
            .put(`${process.env.NEXT_PUBLIC_BASE_URL}/api/farm/${farmer.id}`, {
              isVerified: true,
            })
            .then((res) => {
              setFarm(res.data);
              setIsModalOpen(true);
            });
          toast.success("Farm accepted successfully");
          closeModal();
        } catch (err) {
          toast.error(`Something went wrong ${err}`);
        }
      };

      return (
        <>
          <button onClick={openModal} className="text-blue-500 hover:underline">
            View
          </button>

          <Modal
            show={isModalOpen}
            containerClassName={`modal-container ${customModalOverlayClass}`}
            onClose={closeModal}
            title={`Viewing Farmer: ${farmer.name}`}
            containerStyle={{ background: "dark:bg-gray-800", width: 800 }}
          >
            <div className="flex flex-col p-6 m-0 bg-white dark:bg-gray-800 width-800">
              <div className="mb-4">
                <h5 className="text-2xl font-bold dark:text-gray-300">
                  Farm Name : {farm?.farmName}
                </h5>
                <p className="text-gray-600 dark:text-gray-400">
                  Farm Addrerss: {farm?.address}
                </p>
              </div>

              <div className="mb-4">
                <h5 className="text-xl font-bold mb-2 dark:text-gray-300">
                  Contact Details
                </h5>{" "}
                <span>{farm?.contactDetails}</span>
              </div>

              <div className="mb-4">
                <h3 className="text-xl font-bold mb-2 dark:text-gray-300">
                  Organic Certificates
                </h3>
                <ImageGallery images={farm?.organicCertificates || []} />
              </div>

              {farmer.emailVerified ? (
                <p className="text-green-500">Verified</p>
              ) : (
                <Button
                  onClick={() => {
                    acceptFarm(farm?.id);
                  }}
                  className="bg-dark btn"
                >
                  Accept as organic farm
                </Button>
              )}
            </div>
          </Modal>
        </>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const farmer = row.original;
      return (
        <ActionColumn
          row={row}
          title="Farmer"
          editEndpoint={`farmers/update/${farmer.id}`}
          endpoint={`farmers/${farmer.id}`}
        />
      );
    },
  },
];
