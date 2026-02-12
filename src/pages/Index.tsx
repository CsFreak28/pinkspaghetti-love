import React, { useState, useCallback, useRef } from "react";
import FloatingHearts from "@/components/FloatingHearts";
import CelebrationHearts from "@/components/CelebrationHearts";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

const Index = () => {
  const [saidYes, setSaidYes] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMsg, setPopupMsg] = useState("");
  const [noDodging, setNoDodging] = useState(false);
  const [noPos, setNoPos] = useState<{ x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleYes = () => setSaidYes(true);

  const moveNoButton = useCallback(() => {
    const x = Math.random() * (window.innerWidth - 120);
    const y = Math.random() * (window.innerHeight - 50);
    setNoPos({ x, y });
  }, []);

  const handleNo = () => {
    if (noCount === 0) {
      setPopupMsg(
        "Just dey play!!!!!, okay now, your phone will self-destruct in 30 seconds if you don't go back and click yes 😭💣"
      );
      setShowPopup(true);
      setNoCount(1);
    } else if (noCount === 1) {
      setPopupMsg("It's like you don't like this your xr 😭");
      setShowPopup(true);
      setNoCount(2);
      setNoDodging(true);
    }
  };

  if (saidYes) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-valentine-soft via-background to-valentine-soft relative overflow-hidden">
        <CelebrationHearts />
        <FloatingHearts count={20} />
        <div className="animate-fade-in-up animate-soft-glow rounded-3xl bg-background/80 backdrop-blur-sm px-8 py-12 mx-4 max-w-md text-center z-10">
          <h1 className="font-script text-5xl md:text-6xl text-valentine-deep mb-6">
            Yessss Nenye!!!
          </h1>
          <p className="text-2xl mb-2">💖</p>
          <p className="text-lg text-foreground/80 leading-relaxed">
            You just made me the happiest guy alive.
          </p>
        </div>
        <footer className="absolute bottom-8 z-10">
          <p className="font-script text-xl text-valentine-mid opacity-70">
            Made with love, always.
          </p>
        </footer>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="min-h-screen relative overflow-hidden"
    >
      <FloatingHearts />

      {/* Hero */}
      <section className="min-h-[60vh] flex items-center justify-center bg-gradient-to-b from-valentine-soft via-valentine-soft/40 to-background relative">
        <h1
          className="font-script text-6xl md:text-8xl text-valentine-deep animate-fade-in-up z-10"
        >
          Hi Nenye 💕
        </h1>
      </section>

      {/* Love Letter */}
      <section className="py-16 px-6 max-w-lg mx-auto relative z-10">
        <div
          className="animate-fade-in-up"
          style={{ animationDelay: "0.3s", animationFillMode: "both" }}
        >
          <p className="text-lg md:text-xl leading-relaxed text-foreground/85 font-light">
            I love you so much. Thank you for always checking up on me every time
            I was sick. Every time I needed someone to talk to. For skipping
            classes for me. I didn't realize it sooner, but I love you very much.
            I'm very grateful for you. I promise to buy you so much spaghetti{" "}
            🍝💖
          </p>
        </div>
      </section>

      {/* The Question */}
      <section className="py-12 px-6 relative z-10">
        <div
          className="animate-fade-in-up max-w-md mx-auto text-center"
          style={{ animationDelay: "0.6s", animationFillMode: "both" }}
        >
          <h2 className="font-script text-4xl md:text-5xl text-valentine-deep mb-10">
            Will you be my Valentine? 💌
          </h2>

          <div className="flex gap-6 justify-center items-center relative">
            <button
              onClick={handleYes}
              className="px-10 py-4 rounded-full bg-gradient-to-r from-valentine-mid to-valentine-deep text-primary-foreground text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-pulse-soft"
            >
              Yes 💕
            </button>

            {noDodging ? (
              <button
                onClick={handleNo}
                onMouseEnter={moveNoButton}
                onTouchStart={moveNoButton}
                className="px-10 py-4 rounded-full border-2 border-valentine-mid text-valentine-deep text-lg font-medium transition-all duration-150 fixed z-50"
                style={{
                  left: noPos ? `${noPos.x}px` : "auto",
                  top: noPos ? `${noPos.y}px` : "auto",
                }}
              >
                No 😏
              </button>
            ) : (
              <button
                onClick={handleNo}
                className="px-10 py-4 rounded-full border-2 border-valentine-mid text-valentine-deep text-lg font-medium hover:bg-valentine-soft/50 transition-all duration-300"
              >
                No 😏
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center relative z-10">
        <p className="font-script text-2xl text-valentine-mid opacity-60">
          Made with love, always.
        </p>
      </footer>

      {/* Popup */}
      <AlertDialog open={showPopup} onOpenChange={setShowPopup}>
        <AlertDialogContent className="rounded-2xl border-valentine-soft bg-background max-w-sm mx-auto">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-script text-2xl text-valentine-deep text-center">
              Heyyyy 😭
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center text-base leading-relaxed text-foreground/80">
              {popupMsg}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="justify-center sm:justify-center">
            <AlertDialogAction
              onClick={() => setShowPopup(false)}
              className="rounded-full bg-gradient-to-r from-valentine-mid to-valentine-deep text-primary-foreground px-8"
            >
              Okay 😅
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Index;
