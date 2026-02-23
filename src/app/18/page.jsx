"use client";
import * as motion from "motion/react-client";
import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { FaArrowDown } from "react-icons/fa";

const fileNames = [
	"image (13).jpg",
	"IMG_20250712_131004.jpg",
	"IMG_20250712_140823.jpg",
	"IMG_20250712_140830.jpg",
	"IMG_20250822_161128.jpg",
	"IMG_20251230_120029.jpg",
	"IMG_20251230_120036.jpg",
	"IMG_20251230_120041.jpg",
	"IMG_20251230_120043.jpg",
	"IMG_20260123_073048_251.jpg",
	"IMG_20260131_140630.jpg",
	"IMG_20260131_140642.jpg",
	"IMG_20260131_140659.jpg",
	"IMG_20260131_140714.jpg",
	"IMG_20260204_191429_507.jpg",
	"IMG_20260222_150335_610.jpg",
	"IMG_20260222_150338_655.jpg",
	"IMG_20260222_150344_191.jpg",
	"IMG_20260222_150401_541.jpg",
	"IMG_20260222_150427_844.jpg",
	"IMG-20250730-WA0004.jpg",
	"IMG-20251013-WA0029.jpg",
	"IMG-20251018-WA0001.jpg",
	"IMG-20251116-WA0001.jpg",
	"IMG-20251119-WA0007.jpg",
	"IMG-20251130-WA0018.jpg",
	"IMG-20260120-WA0000.jpg",
	"Screenshot_20251223_175954.jpg",
	"Screenshot_20260113_102329.jpg",
];

const fadeUp = {
	hidden: {
		y: 10,
		opacity: 0,
	},
	visible: {
		y: 0,
		opacity: 1,
		transition: {
			duration: 0.5,
			ease: "easeIn",
		},
	},
};

const brightUp = {
	hidden: {
		filter: "grayscale(100%)",
		opacity: 0.2,
	},
	visible: {
		filter: "grayscale(0%)",
		opacity: 1,
		transition: {
			duration: 0.5,
		},
	},
};

export default function Page18() {
	const [showModal, setShowModal] = useState(true);

	const playMusic = () => {
		const song = new Audio("/audio/Monokrom.mp3");
		song.play();
		setShowModal(false);
	};

	return (
		<main className="w-full  font-lexendeca">
			{/* Play Music */}
			<section className="h-screen relative">
				<AnimatePresence mode="wait">
					{showModal ? (
						<motion.div key={"modal-music"} variants={fadeUp} initial="hidden" animate="visible" exit="hidden" className="bg-white/80 rounded-xl text-slate-900 absolute w-fit left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 p-10">
							<h2>Dengerin lagu buat sesi ini?</h2>
							<div className="mt-4 flex gap-3 *:p-3 *:outline *:rounded-md *:cursor-pointer">
								<button onClick={playMusic}>Boleh</button>
								<button onClick={playMusic} className="bg-gray-950 text-white">
									Boleh banget ^^
								</button>
							</div>
						</motion.div>
					) : (
						<motion.div
							key={"arrow-down"}
							variants={fadeUp}
							initial="hidden"
							animate="visible"
							exit="hidden"
							className="text-white/80 rounded-xl  absolute w-fit left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 p-10 flex flex-col items-center gap-5 "
						>
							<p>Scroll buat lihat kejutan khusus buat kamu</p>
							<FaArrowDown className="animate-bounce size-5" />
						</motion.div>
					)}
				</AnimatePresence>
			</section>

			{/* Photo montage */}
			<section className="h-[500vh] relative">
				{fileNames.map((file, i) => {
					if (i % 2 == 0) {
						return <motion.img variants={brightUp} initial="hidden" whileInView="visible" viewport={{ amount: 1 }} src={`/images/18/${file}`} key={i} className="mr-10 ml-auto w-56 rounded-md " />;
					} else {
						return <motion.img variants={brightUp} initial="hidden" whileInView="visible" viewport={{ amount: 1 }} src={`/images/18/${file}`} key={i} className="ml-10 mr-auto w-56 rounded-md" />;
					}
				})}
			</section>
		</main>
	);
}
