"use client";
import * as motion from "motion/react-client";
import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { FaArrowDown } from "react-icons/fa";

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

export default function Page18() {
	const [showModal, setShowModal] = useState(true);

	const playMusic = () => {
		const song = new Audio("/audio/Monokrom.mp3");
		song.play();
		setShowModal(false);
	};

	return (
		<main className="w-screen font-lexendeca">
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
		</main>
	);
}
