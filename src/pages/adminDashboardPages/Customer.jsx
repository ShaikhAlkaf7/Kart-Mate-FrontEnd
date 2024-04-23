import React, { useEffect, useState } from "react";
import AdminSideBar from "../../components/adminComponents/AdminSideBar";
import axios from "axios";
import { useSelector } from "react-redux";
// const data = [
//   {
//     name: "Alkaf",
//     gender: "Male",
//     email: "shaikhalkafofficial@gmail.com",
//     role: "Admin",
//   },
//   {
//     name: "Alkaf",
//     gender: "Male",
//     email: "shaikhalkafofficial@gmail.com",
//     role: "Admin",
//   },
//   {
//     name: "Alkaf",
//     gender: "Male",
//     email: "shaikhalkafofficial@gmail.com",
//     role: "Admin",
//   },
//   {
//     name: "Alkaf",
//     gender: "Male",
//     email: "shaikhalkafofficial@gmail.com",
//     role: "Admin",
//   },
//   {
//     name: "Alkaf",
//     gender: "Male",
//     email: "shaikhalkafofficial@gmail.com",
//     role: "Admin",
//   },
//   {
//     name: "Alkaf",
//     gender: "Male",
//     email: "shaikhalkafofficial@gmail.com",
//     role: "Admin",
//   },
//   {
//     name: "Alkaf",
//     gender: "Male",
//     email: "shaikhalkafofficial@gmail.com",
//     role: "Admin",
//   },
// ];
const Customer = () => {
  const { user } = useSelector((state) => state?.userReducer);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/admin/users", {
        headers: {
          Authorization: user?.token,
        },
      });
      setData(data?.users);
    } catch (error) {
      console.log(error);
    }
  };

  const rowPerPage = 10;

  const indexOfLastRow = currentPage * rowPerPage;
  const indexOfFirstFirst = indexOfLastRow - rowPerPage;
  const currentRows = data.slice(indexOfFirstFirst, indexOfLastRow);

  const totalPage = Math.ceil(data.length / rowPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div className="grid lg:grid-cols-10 grid-cols-1  gap-6  bg-[#27005d]  h-screen ">
      {/* sidebar  */}
      <div className="lg:col-span-2 col-span-10 ">
        <AdminSideBar />
      </div>
      <main className="text-black h-screen lg:col-span-8 col-span-10 bg-[#27005d]  lg:pr-8 px-4  overflow-auto w-full">
        <div className="px-4 bg-[#AED2FF] rounded-lg mb-2 mt-6">
          <h2 className="text-center py-4 uppercase font-semibold text-xl  text-black">
            Custumers
          </h2>
          <table className="w-full text-left px-4">
            <thead>
              <tr>
                {/* <th className="py-2">Photo</th> */}
                <th>Name</th>
                <th className="hidden sm:inline-block">Gender</th>
                <th className="hidden sm:inline-block">Email</th>
                <th>Role</th>
                {/* <th>Action</th> */}
              </tr>
            </thead>
            <tbody>
              {currentRows.map((d) => (
                <tr className="border-b border-gray-600">
                  <td className="pt-5">{d.name}</td>
                  <td className="pt-5 hidden sm:inline-block">{d.gender}</td>
                  <td className="pt-5 hidden sm:inline-block">{d.email}</td>
                  <td className="pt-5 ">{d.role}</td>
                  {/* <td className="pt-5 pb-3">
                    {" "}
                    <Link className="px-3 py-2 bg-[#40128B] text-white font-semibold rounded-md hover:bg-[#525FE1] hover:text-black ">
                      Edit
                    </Link>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="w-full text-center p-2  flex gap-3 justify-center text-white">
            {Array.from({ length: totalPage }, (_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`px-2  rounded-md ${
                  index + 1 == currentPage
                    ? "bg-white text-black"
                    : "bg-[#27005d]"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Customer;
