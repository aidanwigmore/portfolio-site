import { CustomTypography } from "../../materials/Typography";
import Transcriptions from "./Transcriptions";

export default [
    {
      title: "Batched Support",
      description: "Youtube Demonstrations",
      channel: "Batched Support",
      src: [
        "https://www.youtube.com/embed/IJFOHNK-sBY?si=PXlTKlbJS7qaHsPR",
        "https://www.youtube.com/embed/eX7XDNOrv90?si=qR4uxR5TTRUHuZ-B",
        "https://www.youtube.com/embed/lQwYJoPhWwQ?si=WmTaPeI0Ib-7s82c",
      ],
      steps: [
        'Picking Up Catering Orders from Strathcona MRKT', 
        'Subscribing To MRKTBox', 
        'Signing Up To MRKTBox'
      ],
        stepsLabels: Transcriptions[0].transcriptions,
    },
    {
      title: "Capstone Project",
      description: "TeaBank Demonstrations",
      channel: "aidanOdyssey",
      src: [
        "https://www.youtube.com/embed/fVJ_0QYCSoI?si=p7jX3Wn7ylXdaZxE",
        "https://www.youtube.com/embed/1SbgMCq4-PM?si=yABv-EKPftpFo7fv",
        "https://www.youtube.com/embed/aFiUmvcF3Xw?si=R-781N2WEAGsqnZF",
      ],
      steps: ['Capstone Report 3', 'Capstone Report 4', 'Capstone Final Report'],
      stepsLabels: Transcriptions[1].transcriptions,
    }, 
    {
      title: "PHP / Laravel",
      description: "PHP Course Demonstrations",
      channel: "aidanOdyssey",
      src: [
        "https://www.youtube.com/embed/enO66A4MEjA?si=hljKuYuVjIETDRgi",
        "https://www.youtube.com/embed/otVmSjKBpyQ?si=2JoxDWcCQPJFrSVl",
        "https://www.youtube.com/embed/XFhhSQ-mEgM?si=-UdqBiqhLYOWUhhK",
      ],
      steps: ['Assignment 5', 'Assignment 6','Assignment 7'],
      stepsLabels: Transcriptions[2].transcriptions,
    },
    {
      title: "Soft Skills",
      description: "Technical Presentations",
      channel: "aidanOdyssey",
      src: [
        "https://www.youtube.com/embed/gZUH_6LCkm8?si=3t5TdT_27pHiLuFC",
        "https://www.youtube.com/embed/ZinB2DRHXHg?si=2dpYRMK34Yukf63_",
        "https://www.youtube.com/embed/8etYVCmutxc?si=i9NOLv4AkUvkNQDg",
      ],
      steps: ["Entrepreneurship in today's world - Video Pitch", "Tech Writing Presentation - Product Evaluation and Recommendation", "Tech Writing Presentation 3 (Job posting)"],
      stepsLabels: Transcriptions[3].transcriptions,
    },
  ];