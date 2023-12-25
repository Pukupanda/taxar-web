"use client";
import {
  userPropertyActiveDeactiveApi,
  userPropertyDeleteApi,
} from "@/api/apiCall";
import { useDataStore } from "@/api/store/store";
import Loader from "@/components/Loader/Loader";
import Paginations from "@/components/Paginations/Pagination";
import PropertyBox from "@/components/projectBox/PropertyBox";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

function MyProperty() {
  const list = useDataStore((store) => store.userPropertyList);
  const { fetchUserPropertyList } = useDataStore();

  const [loading, setLoading] = useState(false);
  const [page, setpage] = useState(1);
  const [status, setstatus] = useState("1");

  const handlePage = (val) => {
    setpage(val);
  };

  const params = {
    page: page,
    limit: 10,
    isActive: status === "1" ? true : false,
  };
  useEffect(() => {
    setLoading(true);
    fetchUserPropertyList(params).then(() => {
      setLoading(false);
    });
  }, []);

  const activeDeactiveProperty = (id) => {
    setLoading(true);
    userPropertyActiveDeactiveApi({ id: id }).then(() => {
      setLoading(false);
    });
  };
  const deleteProperty = (id) => {
    setLoading(true);
    userPropertyDeleteApi({ id: id }).then(() => {
      setLoading(false);
    });
  };

  return (
    <>
      <section className="mt-4">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-sm-6 col-md-6 col-lg-6 mb-3">
              <div className="nav gap-2">
                <div
                  className={status === "1" ? "tabStyle loginBtn" : "tabStyle"}
                  role="button"
                  onClick={() => {
                    setstatus("1");
                    setpage("1");
                  }}
                >
                  Active
                </div>
                <div
                  className={status === "2" ? "tabStyle loginBtn" : "tabStyle"}
                  role="button"
                  onClick={() => {
                    setstatus("2");
                    setpage("1");
                  }}
                >
                  Inactive
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-lg-6 mb-3 text-end">
              <Link
                href="/my-property/add"
                className="loginBtn rounded py-2 px-3"
              >
                Add New Property
              </Link>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-12 mb-3">
              <Table className="table table-borderless text-capitalize table-striped">
                <Thead>
                  <Tr>
                    <Th>image</Th>
                    <Th>title</Th>
                    <Th>category</Th>
                    <Th>sub Category</Th>
                    <Th>price</Th>
                    <Th>facing direction</Th>
                    <Th>Location</Th>
                    <Th>action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {loading ? (
                    <Tr className="text-center">
                      <Td colSpan={10}>
                        <Loader />
                      </Td>
                    </Tr>
                  ) : list?.properties?.length > 0 ? (
                    list?.properties?.map((item, i) => (
                      <Tr>
                        <Td>
                          <Image
                            src={
                              item?.displayImage?.includes("http")
                                ? item?.displayImage
                                : "/assets/img/dummyImage.png"
                            }
                            alt={item?.title}
                            width={50}
                            height={50}
                            className="rounded-3"
                            quality={100}
                            priority
                          />
                        </Td>
                        <Td>{item?.title}</Td>
                        <Td>{item?.category}</Td>
                        <Td>{item?.subCategory}</Td>
                        <Td>{item?.price}</Td>
                        <Td>{item?.facingDirection}</Td>
                        <Td>{item?.location}</Td>
                        <Td>
                          <div className="d-flex align-items-center gap-3">
                            <Link href={`/detail/${item?._id}`}>
                              <Image
                                src={"/assets/img/view.png"}
                                alt=""
                                width={19}
                                height={15}
                                quality={100}
                                priority
                              />
                            </Link>
                            <Link href={`/my-property/edit/${item?._id}`}>
                              <Image
                                src={"/assets/img/edit.png"}
                                alt=""
                                width={24}
                                height={24}
                                quality={100}
                                priority
                              />
                            </Link>
                            <Image
                              src={"/assets/img/delete.png"}
                              alt=""
                              width={20}
                              height={20}
                              quality={100}
                              priority
                            />
                          </div>
                        </Td>
                      </Tr>
                    ))
                  ) : (
                    <Tr className="text-center">
                      <Td colSpan={10}>No Properties Found</Td>
                    </Tr>
                  )}
                </Tbody>
              </Table>
            </div>
            {/* {loading ? (
              <Loader />
            ) : list?.properties?.length > 0 ? (
              list?.properties?.map((item, i) => (
                <div className="col-sm-6 col-md-4 col-lg-3 mb-3" key={i}>
                  <PropertyBox item={item} />
                </div>
              ))
            ) : (
              <div className="text-center">No Properties Found</div>
            )} */}
          </div>
          {!loading && list?.properties?.length > 0 && (
            <div className="">
              <Paginations
                page={page}
                handlePage={handlePage}
                total={list?.total_properties}
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default MyProperty;
