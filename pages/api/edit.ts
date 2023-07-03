import { NextApiRequest, NextApiResponse } from "next";

import serverAuth from "@/libs/serverAuth";
import prisma from "@/libs/prismadb";

import { create } from "ipfs-http-client";

export const config = { api: { bodyParser: { sizeLimit: "5mb" } } };

const auth =
  "Basic " +
  Buffer.from(process.env.INFURA_ID + ":" + process.env.INFURA_SECRET).toString(
    "base64"
  );
const client = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  apiPath: "/api/v0",
  headers: {
    authorization: auth,
  },
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PATCH") {
    return res.status(405).end();
  }

  try {
    const { currentUser } = await serverAuth(req, res);

    const { name, username, bio, profileImage, coverImage } = req.body;

    if (!name || !username) {
      throw new Error("Missing fields");
    }

    var baseCode = profileImage.split(",")[0];
    var dataImageCode = profileImage.split(",")[1];
    const base64Response = await fetch(`${baseCode},${dataImageCode}`);
    const blob = await base64Response.blob();

    var baseCode2 = coverImage.split(",")[0];
    var dataImageCode2 = coverImage.split(",")[1];
    const base64Response2 = await fetch(`${baseCode2},${dataImageCode2}`);
    const blob2 = await base64Response2.blob();

    const addedProfileImage = await client.add(blob);
    const addedCover = await client.add(blob2);

    const web3profileImage = `https://ipfs.io/ipfs/${addedProfileImage.path}`;
    const web3CoverImage = `https://ipfs.io/ipfs/${addedCover.path}`;

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        name,
        username,
        bio,
        profileImage,
        coverImage,
        web3profileImage,
        web3CoverImage,
      },
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
