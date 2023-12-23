"use client";
import { useDataStore } from "@/api/store/store";
import BlogComments from "@/components/BlogComments/BlogComments";
import Loader from "@/components/Loader/Loader";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function PublicationDetail() {
  const { id } = useParams();
  const [loading, setloading] = useState(false);

  const detail = useDataStore((store) => store.BlogDetails);
  const { fetchBlogDetails } = useDataStore();

  useEffect(() => {
    setloading(true);
    fetchBlogDetails({ id: id }).then(() => {
      setloading(false);
    });
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <section className="pt-5 mt-4">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-sm-12 col-md-12 col-lg-8">
                <div className="propertyImgBox mb-4">
                  <Image
                    src={
                      detail?.Blog?.image?.includes("http")
                        ? detail?.Blog?.image
                        : "/assets/img/dummyImage.png"
                    }
                    alt=""
                    className="w-100 position-static"
                    fill
                    quality={100}
                    priority
                  />
                </div>
                <h5 className="text-capitalize">{detail?.Blog?.title}</h5>
                <small>{detail?.Blog?.category}</small>
                <div
                  dangerouslySetInnerHTML={{
                    __html: detail?.Blog?.description,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </section>
      )}

      <BlogComments
        id={id}
        fetchBlogDetails={fetchBlogDetails}
        comments={detail?.comment}
      />
    </>
  );
}

export default PublicationDetail;
