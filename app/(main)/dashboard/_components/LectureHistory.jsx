"use client";

import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../../__context/userContext";
import { useConvex } from "convex/react";
import { api } from "../../../../ai-agent/convex/_generated/api";
import { ExpertLists } from "../../../../services/options";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import moment from "moment";
import Link from "next/link";

function LectureHistory() {
  const convex = useConvex();
  const { userData } = useContext(UserContext);
  const [lectureData, setLectureData] = useState([]);

  useEffect(() => {
    userData && GetDiscussionRoomData();
  }, [userData]);

  const GetDiscussionRoomData = async () => {
    const result = await convex.query(api.discussionRoom.getAllDiscussionRoom, {
      userId: userData?._id,
    });
    setLectureData(result);
  };

  const getAbstractImages = (option) => {
    const images = ExpertLists.find((item) => item.name === option);
    return images ? images.icon : "/default.png";
  };

  return (
    <div>
      <h2 className="font-bold text-xl">Your Previous Lectures</h2>
      {lectureData?.length === 0 && (
        <h3 className="text-gray-400 text-sm">
          You don’t have any lectures!
        </h3>
      )}

      {lectureData.map(
        (item, index) =>
          (item.coachingOptions === "Topic based Lecture" ||
            item.coachingOptions === "Language Class") && (
            <div key={index} className="group">
              <div className="flex gap-4 border-b-[1px] pb-2 mb-7 mt-4 justify-between">
                <div className="flex gap-2 items-center">
                  <Image
                    src={getAbstractImages(item.coachingOptions)}
                    width={50}
                    height={50}
                    alt={item.coachingOptions}
                    className="rounded object-center w-[3.5rem] h-[3.8rem]"
                  />
                  <div>
                    <h2 className="font-bold text-gray-600">{item.topic}</h2>
                    <h2>{item.coachingOptions}</h2>
                    <h2 className="text-sm text-gray-400">
                      {moment(item._creationTime).fromNow()}
                    </h2>
                  </div>
                </div>
                <Link href={"/view-summary/" + item._id}>
                  <Button
                    className="invisible group-hover:visible"
                    variant="outline"
                  >
                    View Notes
                  </Button>
                </Link>
              </div>
            </div>
          )
      )}
    </div>
  );
}

export default LectureHistory;
