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

function Feedback() {
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

  // Filter only feedback-type sessions
  const feedbackOptions = [
    "Mock Interview",
    "Ques Ans Preparation",
    "Quiz Preparation",
  ];
  const filteredFeedbacks = lectureData.filter((item) =>
    feedbackOptions.includes(item.coachingOptions)
  );

  return (
    <div className="ml-4">
      <h2 className="font-bold text-xl mb-3">Your Feedbacks</h2>

      {filteredFeedbacks.length === 0 && (
        <h3 className="text-gray-400 text-sm">
          You don’t have any feedback yet!
        </h3>
      )}

      {filteredFeedbacks.map((item, index) => {
        // Find matching icon from ExpertLists
        const imageData = ExpertLists.find(
          (exp) => exp.name === item.coachingOptions
        );
        const icon = imageData ? imageData.icon : "/default.png";

        return (
          <div key={index} className="group">
            <div className="flex gap-4 border-b pb-2 mb-7 mt-4 justify-between">
              <div className="flex gap-2 items-center">
                <Image
                  src={icon}
                  width={50}
                  height={50}
                  alt={item.coachingOptions}
                  className="object-cover rounded h-[3.8rem]"
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
                <Button
                  className="invisible group-hover:visible"
                  variant="outline"
                >
                  View Feedback
                </Button>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Feedback;
