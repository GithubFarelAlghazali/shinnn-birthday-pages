"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence, useMotionValue } from "framer-motion";

// --- IKON SVG ---
const ArrowDownIcon = ({ className }) => (
	<svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
		<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
	</svg>
);

// --- KOMPONEN HALAMAN MODULAR ---
const CoverPage = ({ title, subtitle }) => (
	<div className="w-full h-full flex flex-col items-center justify-center bg-rose-100 text-rose-900 p-4 border-8 border-rose-200">
		<h3 className="text-xl md:text-3xl font-bold  text-center mb-2 whitespace-pre-line">{title}</h3>
		<p className="text-xs md:text-sm mt-4 text-rose-700 italic">{subtitle}</p>
	</div>
);

const TextPage = ({ text }) => (
	<div className="w-full h-full p-6 flex flex-col justify-center items-center bg-amber-50">
		<p className="text-sm md:text-lg font-medium text-slate-700 leading-relaxed text-center">{text}</p>
	</div>
);

const PhotoPage = ({ src, caption }) => (
	<div className="w-full h-full p-4 flex flex-col items-center bg-white border border-gray-200 shadow-inner">
		<div className="w-full h-36 md:h-64 bg-gray-200 overflow-hidden rounded mb-3">
			<img src={src} alt={caption} className="w-full h-full object-cover" />
		</div>
		<p className="text-xs md:text-sm text-gray-500 italic  text-center">{caption}</p>
	</div>
);

const MessagePage = ({ title, text }) => (
	<div className="w-full h-full p-6 flex flex-col items-center justify-center bg-rose-50 text-rose-900 text-center">
		<h3 className="text-2xl md:text-3xl font-bold mb-4 ">{title}</h3>
		<p className="text-sm md:text-base italic">{text}</p>
	</div>
);

const EndPage = ({ text }) => (
	<div className="w-full h-full flex flex-col items-center justify-center bg-rose-200 border-8 border-rose-300">
		<p className="text-rose-800 font-bold  text-lg">{text}</p>
	</div>
);

const BlankPage = ({ bg = "bg-white" }) => <div className={`w-full h-full ${bg}`}></div>;

// Switcher untuk merender komponen berdasarkan tipe
const RenderPage = ({ data }) => {
	switch (data.type) {
		case "cover":
			return <CoverPage title={data.title} subtitle={data.subtitle} />;
		case "text":
			return <TextPage text={data.text} />;
		case "photo":
			return <PhotoPage src={data.src} caption={data.caption} />;
		case "message":
			return <MessagePage title={data.title} text={data.text} />;
		case "end":
			return <EndPage text={data.text} />;
		case "blank":
			return <BlankPage bg={data.bg} />;
		default:
			return <BlankPage />;
	}
};

const bookSheets = [
	{
		id: 1,
		front: { type: "cover", title: "Shinta\ndalam Kamera", subtitle: "Klik untuk buka album" },
		back: { type: "text", text: '"Setiap foto dengan kamu di dalamnya, merupakan keindahan yang tak terhingga.."' },
	},
	{
		id: 2,
		front: { type: "photo", src: "/images/18/wisuda-taun-lalu.jpg", caption: "Waktu wisuda tahun lalu" },
		back: { type: "photo", src: "/images/18/tes-saka.jpg", caption: "Pas mau tes Saka" },
	},
	{
		id: 3,
		front: { type: "photo", src: "/images/18/tes-pramuka.jpg", caption: "Habis kegiatan Pramuka" },
		back: { type: "photo", src: "/images/18/pulang-dari-pab.jpg", caption: "Pagi-pagi masih pakai PDH" },
	},
	{
		id: 4,
		front: { type: "photo", src: "/images/18/pas-joging.jpg", caption: "Waktu joging, waktu itu aku UTBK" },
		back: { type: "photo", src: "/images/18/pace.jpg", caption: "Pas mau wawancara Awardee PACE" },
	},
	{
		id: 5,
		front: { type: "photo", src: "/images/18/pab-juga.jpg", caption: "Waktu PAB PMR" },
		back: { type: "photo", src: "/images/18/mau-lomba.jpg", caption: "Mau lomba di Pendopo" },
	},
	{
		id: 6,
		front: { type: "photo", src: "/images/18/mau-foto-studio.jpg", caption: "Pas mau foto bareng anak-anak sekbid" },
		back: { type: "photo", src: "/images/18/main-ke-alun2.jpg", caption: "Momen ke alun-alun" },
	},
	{
		id: 7,
		front: { type: "photo", src: "/images/18/kemayuu.jpg", caption: "Pose Cakepp 😼" },
		back: { type: "photo", src: "/images/18/kemayu-pab.jpg", caption: "Centill juga" },
	},
	{
		id: 8,
		front: { type: "photo", src: "/images/18/ke-beji.jpg", caption: "Main ke Beiji Park" },
		back: { type: "photo", src: "/images/18/foto-manis.jpg", caption: "Foto termanis ^^" },
	},
	{
		id: 9,
		front: { type: "photo", src: "/images/18/fotbar-pertama.jpg", caption: "Fotbar pertama kitaa" },
		back: { type: "photo", src: "/images/18/fotbar-lapangan.jpg", caption: "Waktu di lapangan" },
	},
	{
		id: 10,
		front: { type: "photo", src: "/images/18/aku-ultah.jpg", caption: "Di kanca waktu aku ultah ^^" },
		back: { type: "message", title: "I Love You Sayang 💞", text: "Semoga hari-harimu selalu penuh dengan kebahagiaan." },
	},
	{
		id: 11,
		front: { type: "end", text: "Ada pesan khusus di bawah" },
		back: { type: "blank", bg: "bg-rose-300" },
	},
];

const textVariants = {
	initial: { y: 15, opacity: 0 },
	animate: { y: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
	exit: { y: -15, opacity: 0, transition: { duration: 0.3, ease: "easeIn" } },
};

export default function BirthdayCake() {
	const [isBlownOut, setIsBlownOut] = useState(false);
	const [isFullyLit, setIsFullyLit] = useState(false);
	const [instructionStep, setInstructionStep] = useState("scroll");
	const [currentPage, setCurrentPage] = useState(0);
	const [isLetterOpen, setIsLetterOpen] = useState(false);

	const audioRef = useRef(null);
	const cakeContainerRef = useRef(null);

	const { scrollYProgress } = useScroll({
		target: cakeContainerRef,
		offset: ["start start", "end end"],
	});

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
			if (audioRef.current) {
				audioRef.current.play().catch((error) => console.log("Audio playback failed:", error));
			}
		}
	}, [isBlownOut]);

	useMotionValueEvent(scrollYProgress, "change", (latest) => {
		if (latest >= 0.8) {
			setIsFullyLit(true);
			hasIgnited.set(1);
			if (!isBlownOut && instructionStep !== "click") setInstructionStep("click");
		} else {
			setIsFullyLit(false);
		}

		if (latest < 0.05) {
			if (isBlownOut) setIsBlownOut(false);
			hasIgnited.set(0);
			if (instructionStep !== "scroll") setInstructionStep("scroll");
		}
	});

	return (
		<div className="bg-slate-950 font-lexendeca">
			{/* Cake Section */}
			<main ref={cakeContainerRef} className="relative h-[500vh]">
				<audio ref={audioRef} src="/audio/Monokrom.mp3" preload="auto" loop />
				<div className="sticky top-0 h-screen flex flex-col items-center justify-center p-4 overflow-hidden font-lexendeca">
					{/* Container Teks Instuksi */}
					<div className="absolute top-24 z-50 h-20 flex flex-col items-center justify-center text-slate-200">
						<AnimatePresence mode="wait">
							{instructionStep === "scroll" && (
								<motion.div key="scroll" variants={textVariants} initial="initial" animate="animate" exit="exit" className="text-center">
									<h2 className="text-xl md:text-2xl font-bold">Scroll buat nyalain lilinnya</h2>
									<ArrowDownIcon className="mx-auto mt-4 w-8 h-8 animate-bounce" />
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
									<p className="text-sm md:text-base text-slate-400 mt-2 font-light animate-pulse">Scroll buat lihat album kamu ^^</p>
									<ArrowDownIcon className="mx-auto mt-4 w-6 h-6 text-slate-400 animate-bounce" />
								</motion.div>
							)}
						</AnimatePresence>
					</div>

					<motion.div className="absolute inset-0 pointer-events-none" animate={{ opacity: isBlownOut ? 0 : 1 }} transition={{ duration: 1 }}>
						<motion.div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-800 to-transparent" style={{ opacity: lightOpacity }} />
					</motion.div>

					{/* Cake Container */}
					<div className="relative w-64 h-64 md:w-[420px] md:h-[420px] mt-10 z-10 rounded-[50%]">
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

			{/* Book Gallery Section */}
			{isBlownOut && (
				<>
					<section className="relative min-h-screen bg-slate-900 flex flex-col items-center justify-center py-24 overflow-hidden z-10 border-t border-slate-800">
						<motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-5xl font-bold text-slate-200 mb-12 text-center  tracking-wide">
							Album Foto
						</motion.h2>

						{/* Container Utama Buku */}
						<div className="relative w-[300px] md:w-[600px] h-[220px] md:h-[400px] flex justify-center items-center" style={{ perspective: "1500px" }}>
							{/* Wrapper yang bergeser ke kanan saat buku dibuka supaya tetap di tengah */}
							<motion.div className="relative w-[150px] md:w-[300px] h-full" animate={{ x: currentPage === 0 ? 0 : "50%" }} transition={{ duration: 0.8, ease: "easeInOut" }}>
								{bookSheets.map((sheet, index) => {
									const isFlipped = currentPage > index;
									const zIndex = isFlipped ? index : bookSheets.length - index;

									return (
										<motion.div
											key={sheet.id}
											className="absolute top-0 left-0 w-full h-full origin-left cursor-pointer"
											style={{ transformStyle: "preserve-3d", zIndex: zIndex }}
											animate={{ rotateY: isFlipped ? -180 : 0, z: isFlipped ? index : -index }}
											transition={{ duration: 0.8, ease: "easeInOut" }}
											onClick={() => {
												if (isFlipped) setCurrentPage(index);
												else setCurrentPage(index + 1);
											}}
										>
											{/* Bagian Depan Halaman */}
											<div
												style={{ backfaceVisibility: "hidden" }}
												className={`absolute inset-0 bg-white rounded-r-lg overflow-hidden flex flex-col
                                                ${currentPage === 0 && index === 0 ? "shadow-[10px_10px_20px_rgba(0,0,0,0.5)]" : "shadow-[2px_0_5px_rgba(0,0,0,0.1)]"}`}
											>
												<RenderPage data={sheet.front} />
											</div>

											{/* Bagian Belakang Halaman */}
											<div style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }} className="absolute inset-0 bg-white rounded-l-lg shadow-[-2px_0_5px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col">
												<RenderPage data={sheet.back} />
											</div>
										</motion.div>
									);
								})}
							</motion.div>
						</div>

						<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-16 flex gap-2 items-center text-slate-400 text-sm bg-slate-800/50 px-4 py-2 rounded-full">
							<span>Klik halaman buku untuk membaliknya</span>
						</motion.div>
					</section>
				</>
			)}
			{isBlownOut && (
				<section className="relative min-h-[60vh] bg-slate-950 flex flex-col items-center justify-center py-20 z-10 border-t border-slate-800/50">
					<motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
						<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setIsLetterOpen(true)} className="cursor-pointer group relative flex flex-col items-center">
							{/* Desain Amplop */}
							<div className="w-64 h-40 bg-rose-200 rounded-md relative shadow-lg overflow-hidden flex items-center justify-center">
								{/* Tutup amplop atas (berotasi saat hover) */}
								<div className="absolute top-0 left-0 w-0 h-0 border-t-[80px] border-t-rose-300 border-l-[128px] border-l-transparent border-r-[128px] border-r-transparent z-20 origin-top transition-transform duration-500 group-hover:-translate-y-56"></div>
								{/* Bagian bawah amplop */}
								<div className="absolute bottom-0 left-0 w-0 h-0 border-b-[80px] border-b-rose-100 border-l-[128px] border-l-transparent border-r-[128px] border-r-transparent z-10"></div>
								{/* Sisi kiri amplop */}
								<div className="absolute top-0 left-0 w-0 h-0 border-l-[128px] border-l-rose-100/50 border-t-[80px] border-t-transparent border-b-[80px] border-b-transparent z-10"></div>
								{/* Sisi kanan amplop */}
								<div className="absolute top-0 right-0 w-0 h-0 border-r-[128px] border-r-rose-100/50 border-t-[80px] border-t-transparent border-b-[80px] border-b-transparent z-10"></div>

								{/* Kertas surat yang mengintip saat di-hover */}
								<div className="w-[85%] h-[90%] bg-[#fdfbf7] absolute bottom-0 transition-transform duration-500 group-hover:-translate-y-6 flex items-start justify-center pt-3 shadow-inner z-0">
									<span className="text-rose-800  text-sm border-b border-rose-200 pb-1">Untuk: Shinta💞</span>
								</div>

								{/* Stempel Love */}
								<div className="w-10 h-10 bg-red-600 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 shadow-sm flex items-center justify-center group-hover:opacity-0 transition-opacity duration-300">
									<span className="text-white text-sm ">❤</span>
								</div>
							</div>
							<p className="mt-8 text-slate-300  animate-pulse text-lg">Satu pesan buat kamu</p>
						</motion.div>
					</motion.div>
				</section>
			)}

			{/* Modal Surat Full Screen */}
			<AnimatePresence>
				{isLetterOpen && (
					<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12">
						{/* Overlay latar belakang gelap */}
						<motion.div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsLetterOpen(false)} />

						{/* Konten Kertas Surat */}
						<motion.div
							initial={{ scale: 0.8, y: 100, rotate: -5 }}
							animate={{ scale: 1, y: 0, rotate: 0 }}
							exit={{ scale: 0.8, y: 100, rotate: 5, opacity: 0 }}
							transition={{ type: "spring", damping: 20, stiffness: 100 }}
							className="relative w-full max-w-3xl max-h-[90vh] bg-[#fdfbf7] rounded-sm shadow-2xl overflow-y-auto z-10 p-8 md:p-14"
							style={{
								backgroundImage: "linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px)",
								backgroundSize: "100% 2.5rem",
								backgroundPositionY: "3.5rem",
							}}
						>
							<button
								onClick={() => setIsLetterOpen(false)}
								className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 flex items-center justify-center rounded-full bg-slate-200/50 text-slate-600 hover:bg-rose-100 hover:text-rose-600 transition-colors z-20"
							>
								<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
								</svg>
							</button>

							<div className=" text-slate-800 max-w-2xl mx-auto mt-2">
								<h2 className="text-3xl md:text-5xl font-bold text-rose-900 mb-8 italic">Untuk: Shinta 💞</h2>

								<div className="space-y-8 text-base md:text-xl leading-[2.5rem] md:leading-[2.5rem]">
									<p>
										Hai, selamat ulang tahun sayang. Ga kerasa ya, aku dah nemenin kamu dari tahun lalu waktu baru 17 tahun sampai sekarang udah 18 tahun. Seneng rasanya bisa berproses bareng kamu & membersamai kamu
										setahun ke belakang, dan aku harap bisa membersamai kamu terus di tahun-tahun berikutnya.
									</p>
									<p>
										Kamu udah jadi makin dewasa ya, sedikit spill dari aku, umur 18 nanti bakal banyak banget gebrakannya, but i believe you can get through it sayang. Kamu butuh ruang cerita, bisa bilang ke aku sebagai
										someone to talk nya kamu ^^, or anything random story you wanna tell to me.
									</p>
									<p>
										Aku doain semoga kamu lolos SNBP nanti, kalo engga masih ada SNBT dan aku berdoa semoga Allah ga nyia-nyiain perjuangan kamu selama ini. Aku doain juga semoga kamu selalu diberi kesehatan, kekuatan,
										kemudahan, dan kebahagiaan. Intinya, aku doain semua yang terbaik buat kamu, dan minta supaya cita-cita kamu selama ini bisa dimudahkan.
									</p>
									<p>
										Tetep jadi gadis yang baik ya, baik bagi orangtua, keluarga, teman, dan orang-orang sekitar kamu. Aku juga minta maaf buat semua kesalahan yang banyak aku lakuin ke kamu, dan terimakasih karena sudah
										mau bertahan selama ini.
									</p>
									<p>
										Terakhir, aku mau bilang, kalau aku bangga bisa sama kamu, aku seneng, & aku bersyukur, bersyukur banget bisa ketemu orang sebaik & secantik kamu. Semoga kita bisa tetep bareng ya. Aku sayang kamu,
										selalu, dan kamu, tetep sayang aku juga ya.. ^^
									</p>
									<p>
										Terimakasih udah baca surat ini sampai akhir, aku harap tahun ini & seterusnya kamu dilimpahi kemudahan & kelapangan ya, aku yakin kalo tahun ini bakal jadi tahunnya kamu. Thank you sayang, wish you
										all the best ❤️
									</p>
									<p className="pt-8 text-right italic text-rose-800 font-bold">
										With love
										<br />
										Pacarnya kamu: Farel
									</p>
								</div>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
