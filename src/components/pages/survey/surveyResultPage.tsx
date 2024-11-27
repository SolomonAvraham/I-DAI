// import React from "react";
// import {
//   FacebookShareButton,
//   FacebookIcon,
//   TwitterShareButton,
//   LinkedinShareButton,
//   LinkedinIcon,
//   WhatsappShareButton,
//   WhatsappIcon,
//   XIcon,
// } from "react-share";
// import Head from "next/head";
 
// export default function SurveyResultPage() {
//   // Sharing details
//   const pageTitle = "Ultimate Personality Quiz";
//   const result = "I scored 85% in the Personality Match Quiz!";
//   const shareUrl = "https://i-dai.com/"; // Replace with actual page URL
//   const imageUrl =
//     "https://www.researchgate.net/profile/Noor-Hafhizah-Abd-Rahim/publication/344439146/figure/fig1/AS:941749086203904@1601541887336/Example-of-a-Twitter-Post.png";
//   const description = `Discover your ultimate personality match! Take the quiz now!`;

//   return (
//     <>
//       <Head>
//         {/* Open Graph Metadata */}
//         <title>sfvgsfgsgsfgs</title>{" "}
//         <meta name="description" content="sfsssfvs vsfvfsvsfv svsvsfv" />
//         <meta property="og:title" content="ffffff fffff" />
//         <meta property="og:description" content="sfsssfvs vsfvfsvsfv svsvsfv" />
//         <meta property="og:image" content={imageUrl} />
//         <meta property="og:url" content={shareUrl} />
//         <meta property="og:type" content="website" />
//         {/* Twitter Metadata */}
//         <meta name="twitter:card" content="summary_large_image" />
//         <meta name="twitter:site" content="@I-DAI" />
//         <meta name="twitter:title" content="ffff dsfvava asfgasgas" />
//         <meta name="twitter:description" content="kkkkg gkgnkgg" />
//         <meta name="twitter:image" content={imageUrl} />
//         <meta name="twitter:url" content="https://i-dai.com" />
//       </Head>

//       <div className="flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 p-6 rounded-lg shadow-lg">
//         <div className="bg-white shadow-xl rounded-xl p-8 max-w-md w-full text-center">
//           <h1 className="text-3xl font-bold mb-6 text-blue-800">
//             Your Personality Quiz Result
//           </h1>

//           <div className="mb-6 flex justify-center">
//             <img
//               src={imageUrl}
//               alt="Personality Quiz Result"
//               width={300}
//               height={300}
//               className="rounded-xl shadow-lg object-cover"
//             />
//           </div>

//           <p className="text-lg mb-6 text-gray-700">{result}</p>

//           <div className="flex justify-center gap-4">
//             {/* Facebook Share */}
//             <FacebookShareButton
//               url={shareUrl}
//               //quote={description}
//               hashtag="#HowDoIDie"
//             >
//               <FacebookIcon size={48} round className="hover:scale-105" />
//             </FacebookShareButton>

//             {/* Twitter Share */}
//             <TwitterShareButton url={shareUrl} title={description}>
//               <XIcon size={48} round className="hover:scale-105" />
//             </TwitterShareButton>

//             {/* LinkedIn Share */}
//             <LinkedinShareButton url={shareUrl}>
//               <LinkedinIcon size={48} round className="hover:scale-105" />
//             </LinkedinShareButton>

//             {/* WhatsApp Share */}
//             <WhatsappShareButton url={shareUrl} title={description}>
//               <WhatsappIcon size={48} round className="hover:scale-105" />
//             </WhatsappShareButton>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
