"use client";
import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence, useMotionValue } from "framer-motion";
import { FaArrowDown } from "react-icons/fa";

const textVariants = {
	initial: {
		y: 15,
		opacity: 0,
	},
	animate: {
		y: 0,
		opacity: 1,
		transition: { duration: 0.4, ease: "easeOut" },
	},
	exit: {
		y: -15,
		opacity: 0,
		transition: { duration: 0.3, ease: "easeIn" },
	},
};

export default function BirthdayCake() {
	const [isBlownOut, setIsBlownOut] = useState(false);
	const [isFullyLit, setIsFullyLit] = useState(false);

	const [instructionStep, setInstructionStep] = useState("scroll");

	const { scrollYProgress } = useScroll();
	const hasIgnited = useMotionValue(0);

	const flameScale = useTransform(scrollYProgress, (latest) => {
		if (hasIgnited.get() === 1) return 1;
		return Math.max(0, Math.min(1, (latest - 0.1) / 0.7));
	});

	const lightOpacity = useTransform(scrollYProgress, (latest) => {
		if (hasIgnited.get() === 1) return 1;
		return Math.max(0, Math.min(1, (latest - 0.1) / 0.7));
	});

	useEffect(() => {
		if (isBlownOut) {
			setInstructionStep("congrats");
		}
	}, [isBlownOut]);

	useMotionValueEvent(scrollYProgress, "change", (latest) => {
		if (latest >= 0.8) {
			setIsFullyLit(true);
			hasIgnited.set(1);
			if (!isBlownOut && instructionStep !== "click") {
				setInstructionStep("click");
			}
		} else {
			setIsFullyLit(false);
		}

		if (latest < 0.05) {
			if (isBlownOut) setIsBlownOut(false);
			hasIgnited.set(0);
			if (instructionStep !== "scroll") {
				setInstructionStep("scroll");
			}
		}
	});

	return (
		<main className="relative h-[500vh] bg-slate-950">
			<div className="sticky top-0 h-screen flex flex-col items-center justify-center p-4 overflow-hidden font-lexendeca">
				{/* Container Teks Instuksi */}
				<div className="absolute top-24 z-50 h-20 flex flex-col items-center justify-center text-slate-200">
					<AnimatePresence mode="wait">
						{instructionStep === "scroll" && (
							<motion.div key="scroll" variants={textVariants} initial="initial" animate="animate" exit="exit" className="text-center">
								<h2 className="text-xl md:text-2xl font-bold">Scroll buat nyalain lilinnya</h2>
								<FaArrowDown className="mx-auto mt-4 text-2xl animate-bounce" />
							</motion.div>
						)}

						{instructionStep === "click" && (
							<motion.div key="click" variants={textVariants} initial="initial" animate="animate" exit="exit" className="text-center">
								<h2 className="text-xl md:text-2xl font-bold">Klik api buat matiinnya</h2>
							</motion.div>
						)}

						{instructionStep === "congrats" && (
							<motion.div key="congrats" variants={textVariants} initial="initial" animate="animate" exit="exit" className="text-center">
								<h2 className="text-xl md:text-4xl font-bold">Selamat Ulang Tahun Shinta🤍</h2>
							</motion.div>
						)}
					</AnimatePresence>
				</div>

				<motion.div className="absolute inset-0 pointer-events-none" animate={{ opacity: isBlownOut ? 0 : 1 }} transition={{ duration: 1 }}>
					<motion.div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-800 to-transparent" style={{ opacity: lightOpacity }} />
				</motion.div>

				{/* Cake Container */}
				<div className="relative w-[96] h-[96] md:w-[420px] md:h-[420px] mt-10 z-10 rounded-[50%]">
					{/* Plate */}
					<div className="absolute bottom-0 left-0 w-full h-20 bg-slate-300 rounded-[50%] shadow-xl shadow-black/50 border-b-4 border-slate-400"></div>
					<div className="absolute bottom-2 left-4 w-[90%] h-14 bg-slate-200 rounded-[50%]"></div>

					{/* Cake Layers */}
					<div className="absolute bottom-5 left-0 w-full h-20 bg-amber-900 rounded-[50%] border-b border-amber-950/40 z-0"></div>
					<div className="absolute bottom-14 left-0 w-full h-36 bg-amber-800 rounded-xl z-0"></div>

					{/* Drip/Icing */}
					<div className="absolute bottom-32 left-0 w-full h-16 flex justify-between px-3 z-10 text-orange-950 rounded-[50%]">
						<div className="w-8 h-14 bg-orange-950 rounded-b-full shadow-sm"></div>
						<div className="w-9 h-10 bg-orange-950 rounded-b-full shadow-sm"></div>
						<div className="w-7 h-16 bg-orange-950 rounded-b-full shadow-sm"></div>
						<div className="w-10 h-9 bg-orange-950 rounded-b-full shadow-sm"></div>
						<div className="w-8 h-12 bg-orange-950 rounded-b-full shadow-sm"></div>
						<div className="w-8 h-15 bg-orange-950 rounded-b-full shadow-sm"></div>
						<div className="w-9 h-11 bg-orange-950 rounded-b-full shadow-sm"></div>
					</div>

					{/* Top Layer/Decor */}
					<div className="absolute bottom-40 left-0 w-full h-20 bg-orange-950 rounded-[50%] z-20 shadow-inner overflow-hidden">
						<div className="absolute top-5 left-10 w-3 h-1 bg-yellow-300 rounded-full rotate-45"></div>
						<div className="absolute top-10 left-20 w-3 h-1 bg-blue-400 rounded-full -rotate-12"></div>
						<div className="absolute top-6 left-44 w-3 h-1 bg-green-300 rounded-full rotate-90"></div>
						<div className="absolute top-12 left-56 w-3 h-1 bg-red-400 rounded-full rotate-12"></div>
						<div className="absolute top-14 left-36 w-3 h-1 bg-purple-400 rounded-full -rotate-45"></div>
						<div className="absolute top-8 left-60 w-3 h-1 bg-white rounded-full"></div>
						<div className="absolute top-14 left-12 w-3 h-1 bg-orange-400 rounded-full"></div>
					</div>

					{/* Candle */}
					<div
						className="absolute bottom-44 left-1/2 -translate-x-1/2 w-5 h-20 bg-white border border-red-200 rounded-t-sm z-30 shadow-md"
						style={{ background: "repeating-linear-gradient(45deg, #fef08a, #fef08a 10px, #fca5a5 10px, #fca5a5 20px)" }}
					>
						{/* Wick */}
						<div className={`absolute top-[-10px] left-2 w-1 h-2.5 ${!isBlownOut ? "bg-slate-800" : "bg-slate-900"} rounded-t-sm`}></div>

						{/* Flame */}
						<AnimatePresence>
							{!isBlownOut && (
								<motion.div className="absolute top-[-38px] left-[-2px] w-5 h-8 origin-bottom" style={{ scale: flameScale, opacity: lightOpacity }} exit={{ opacity: 0, scale: 0, transition: { duration: 0.2 } }}>
									<motion.div
										className={`w-full h-full ${isFullyLit ? "cursor-pointer hover:scale-110" : ""}`}
										style={{
											borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
											background: "radial-gradient(ellipse at bottom, #ffffff 10%, #facc15 30%, #f97316 70%, #ea580c 100%)",
										}}
										animate={{
											scaleX: [0.95, 1.05],
											scaleY: [1, 1.05],
											rotate: [-1, 2],
											boxShadow: ["0px -2px 15px 5px rgba(255, 165, 0, 0.5)", "0px -2px 25px 8px rgba(255, 165, 0, 0.8)"],
										}}
										transition={{ duration: 0.12, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
										onClick={() => {
											if (isFullyLit || hasIgnited.get() === 1) setIsBlownOut(true);
										}}
										title={isFullyLit || hasIgnited.get() === 1 ? "Klik untuk meniup lilin!" : ""}
									/>
								</motion.div>
							)}
						</AnimatePresence>

						{/* Smoke */}
						{isBlownOut && (
							<motion.div
								className="absolute top-[-25px] left-2 w-2 h-2 bg-gray-400 rounded-full blur-sm"
								initial={{ y: 0, scale: 1, opacity: 0.8 }}
								animate={{ y: -50, scale: 3, opacity: 0 }}
								transition={{ duration: 3, ease: "easeOut" }}
							/>
						)}

						{/* Candle Glow */}
						<motion.div className="absolute top-[-60px] left-[-40px] w-24 h-24 bg-orange-400/20 rounded-full blur-2xl pointer-events-none" animate={{ opacity: isBlownOut ? 0 : 1 }}>
							<motion.div className="w-full h-full" style={{ opacity: lightOpacity }} />
						</motion.div>
					</div>
				</div>
			</div>
		</main>
	);
}
