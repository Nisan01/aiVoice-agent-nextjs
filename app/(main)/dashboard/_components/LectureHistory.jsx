"use client";

import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../../__context/userContext";
import { useConvex } from "convex/react";
import { api } from "../../../../ai-agent/convex/_generated/api";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import moment from "moment";
import Link from "next/link";
import { getExpertDetails } from "@/utils/expertUtils";

function LectureHistory() {
  const convex = useConvex();
  const { userData } = useContext(UserContext);
  const [lectureData, setLectureData] = useState([]);

  useEffect(() => {
    if (userData) GetDiscussionRoomData();
  }, [userData]);

  const GetDiscussionRoomData = async () => {
    const result = await convex.query(api.discussionRoom.getAllDiscussionRoom, {
      userId: userData?._id,
    });
    setLectureData(result);
  };

  const lectureOptions = ["Topic based Lecture", "Language Class"];

  const filteredLectures = lectureData.filter((item) =>
    lectureOptions.includes(item.coachingOptions)
  );

  return (
    <div>
      <h2 className="font-bold text-xl">Your Previous Lectures</h2>
      {filteredLectures.length === 0 && (
        <h3 className="text-gray-400 text-sm">
          You don’t have any lectures!
        </h3>
      )}

      {filteredLectures.map((item, index) => {
        const { icon } = getExpertDetails(item.coachingOptions);
        return (
          <div key={index} className="group">
            <div className="flex gap-4 border-b pb-2 mb-7 mt-4 justify-between">
              <div className="flex gap-2 items-center">
                <Image
                  src={icon}
                  width={50}
                  height={50}
                  alt={item.coachingOptions}
                  className="rounded w-[3.5rem] h-[3.8rem] object-cover"
                />
                <div>
                  <h2 className="font-bold text-gray-600">{item.topic}</h2>
                  <h2>{item.coachingOptions}</h2>
                  <h2 className="text-sm text-gray-400">
                    {moment(item._creationTime).fromNow()}
                  </h2>
                </div>
              </div>
              <Link href={`/view-summary/${item._id}`}>
                <Button className="invisible group-hover:visible" variant="outline">
                  View Notes
                </Button>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default LectureHistory;
