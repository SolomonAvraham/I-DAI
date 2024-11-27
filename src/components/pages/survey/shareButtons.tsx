"use client";

import React from "react";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";

type ShareButtonsProps = {
  shareUrl: string;
  title: string;
  description: string;
  image: string;
};

export default function ShareButtons({
  shareUrl,
  title,
  description,
 }: ShareButtonsProps) {
  return (
    <div className="flex justify-center gap-4 mt-4">
      <FacebookShareButton url={shareUrl} hashtag="#QuizResult">
        <FacebookIcon size={48} round className="hover:scale-105" />
      </FacebookShareButton>
      <TwitterShareButton url={shareUrl} title={description}>
        <TwitterIcon size={48} round className="hover:scale-105" />
      </TwitterShareButton>
      <LinkedinShareButton url={shareUrl} title={title} summary={description}>
        <LinkedinIcon size={48} round className="hover:scale-105" />
      </LinkedinShareButton>
      <WhatsappShareButton url={shareUrl} title={description}>
        <WhatsappIcon size={48} round className="hover:scale-105" />
      </WhatsappShareButton>
    </div>
  );
}
