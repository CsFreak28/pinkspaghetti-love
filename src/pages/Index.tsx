import React, { useState, useCallback, useRef, useEffect } from "react";
import FloatingHearts from "@/components/FloatingHearts";
import CelebrationHearts from "@/components/CelebrationHearts";
import RevealSection from "@/components/RevealSection";
import MusicToggle from "@/components/MusicToggle";
import sound from "../withasmile.mp3";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

const reasons = [
  { emoji: "💌", text: "You always check up on me when I'm down" },
  { emoji: "📚", text: "You skipped classes just to be there for me" },
  { emoji: "🌙", text: "You listen when I need someone to talk to" },
  { emoji: "🍝", text: "You understand me so much" },
  {
    emoji: "🎄",
    text: "You spent Christmas at my family house — that meant everything",
  },
  { emoji: "✨", text: "You make every singleeee moment brighter" },
  { emoji: "🤗", text: "Your care feels like home" },
];

const Index = () => {
  const [audioLoaded, setAudioLoaded] = useState(false);
  const [showMusicPrompt, setShowMusicPrompt] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [pageReady, setPageReady] = useState(false); // Controls the loading screen
  const [audioReady, setAudioReady] = useState(false); // Controls the music prompt

  useEffect(() => {
    const audio = new Audio(sound);
    audio.preload = "auto";

    const handleCanPlay = () => {
      setAudioReady(true);
      setPageReady(true); // Audio is ready, so page is definitely ready
      audioRef.current = audio;
      setShowMusicPrompt(true); // Show prompt now
    };

    audio.addEventListener("canplaythrough", handleCanPlay);

    // SAFETY FALLBACK:
    // If audio is slow, show the page anyway after 2.5 seconds
    // but don't show the music prompt yet.
    const timer = setTimeout(() => {
      setPageReady(true);
    }, 2500);

    const promptTimer = setTimeout(() => {
      setShowMusicPrompt(true);
    }, 5000);
    return () => {
      audio.removeEventListener("canplaythrough", handleCanPlay);
      clearTimeout(timer);
      clearTimeout(promptTimer);
    };
  }, []);

  // When audio finally finishes loading in the background,
  // this effect triggers the prompt later.
  useEffect(() => {
    if (audioReady && pageReady) {
      setShowMusicPrompt(true);
    }
  }, [audioReady, pageReady]);

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
        "Just dey play!!!!!, okay now, your phone will self-destruct in 30 seconds if you don't go back and click yes 😭💣",
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
        {!pageReady && (
          <div
            className={`fixed inset-0 z-[9999] flex items-center justify-center bg-valentine-deep transition-opacity duration-1000`}
          >
            {!pageReady && (
              <div className="flex flex-col items-center gap-6">
                <h1 className="font-script text-4xl md:text-6xl text-white animate-pulse">
                  Hey baby… are you ready? 💕
                </h1>
                <p className="text-white/70 text-sm tracking-widest">
                  Loading something special...
                </p>

                {/* Pulsing hearts */}
                <div className="flex gap-4 mt-4">
                  {[1, 2, 3].map((i) => (
                    <span
                      key={i}
                      className="text-4xl animate-ping"
                      style={{ animationDelay: `${i * 200}ms` }}
                    >
                      ❤️
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <CelebrationHearts />
        <FloatingHearts count={20} />
        <MusicToggle />
        <div className="animate-fade-in-up animate-soft-glow rounded-3xl bg-background/80 backdrop-blur-sm px-8 py-12 mx-4 max-w-md text-center z-10">
          <h1 className="font-script text-5xl md:text-6xl text-valentine-deep mb-6">
            Yessss Nenye!!!
          </h1>
          <p className="text-2xl mb-2">💖</p>
          <p className="text-lg text-foreground/80 leading-relaxed">
            You just made me, Gideon 🥹, the happiest guy alive.
          </p>
          <p className="text-base text-foreground/60 mt-4 italic">
            — Gideon 💕
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
    <div ref={containerRef} className="min-h-screen relative overflow-hidden">
      <FloatingHearts />
      {/* <MusicToggle /> */}
      {!pageReady && (
        <div
          className={`fixed inset-0 z-[9999] flex items-center justify-center bg-valentine-deep transition-opacity duration-1000`}
        >
          {!pageReady && (
            <div className="flex flex-col items-center gap-6">
              <h1 className="font-script text-4xl md:text-6xl text-white animate-pulse">
                Hey baby… are you ready? 💕
              </h1>
              <p className="text-white/70 text-sm tracking-widest">
                Loading something special...
              </p>

              {/* Pulsing hearts */}
              <div className="flex gap-4 mt-4">
                {[1, 2, 3].map((i) => (
                  <span
                    key={i}
                    className="text-4xl animate-ping"
                    style={{ animationDelay: `${i * 200}ms` }}
                  >
                    ❤️
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      {/* Hero */}
      <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-valentine-soft via-valentine-soft/40 to-background relative">
        <h1 className="font-script text-6xl md:text-8xl text-valentine-deep animate-fade-in-up z-10">
          Hi Nenye 💕
        </h1>
        <p
          className="mt-6 text-foreground/50 text-sm tracking-widest uppercase animate-fade-in-up z-10"
          style={{ animationDelay: "0.8s", animationFillMode: "both" }}
        >
          scroll down
        </p>
        <div
          className="absolute bottom-10 animate-bounce z-10"
          style={{ animationDelay: "1.2s" }}
        >
          <span className="text-valentine-mid text-2xl">↓</span>
        </div>
      </section>

      {/* Love Letter */}
      <section className="py-24 px-6 relative z-10">
        <RevealSection className="max-w-lg mx-auto">
          <h2 className="font-script text-3xl md:text-4xl text-valentine-deep mb-8 text-center">
            A little letter for you…
          </h2>
          <p className="text-lg md:text-xl leading-relaxed text-foreground/85 font-light">
            I love you so much. Thank you for always checking up on me every
            time I was sick. Every time I needed someone to talk to. For
            skipping classes for me. I didn't realize it sooner, but I love you
            very much. I'm so grateful you spent Christmas at my family house —
            that meant the world to me. Having you spend Christmas at my
            family’s house meant more to me than I can explain. Seeing you
            there, laughing, being part of my world… it felt right. <br />{" "}
            <br /> You made both my parents happy... <br /> <br />I know I’m
            currently hurting, confused, and emotional. But the only thing I’m
            sure of in my life right now is that I love you, Nenye. That’s the
            only thing I’m completely certain about. When everything feels
            overwhelming and my thoughts are all over the place, my heart is
            still clear about you. If I ever made you feel unsure, I’m sorry.
            Truly. But please don’t confuse a difficult moment with a lack of
            love. I love you deeply. Completely. Not in a surface-level or
            convenient way, but in a way that is steady and intentional. Even in
            my confusion, even in my emotions, my love for you has never been a
            question. It’s real. It’s constant. And it’s yours. <br /> <br />{" "}
            I'm very grateful for you. My love, one of the things I adore most
            about you is how predictable you are — but only because your love
            for me never changes. I can predict that you’ll check on me when I’m
            not okay. I can predict that you’ll show up when I need you. I can
            predict that you’ll choose me, every single time. And that kind of
            “predictable” is the safest, most beautiful feeling in the world. I
            promise to buy you so much spaghetti 🍝💖
          </p>
          <p className="text-right text-foreground/50 mt-6 italic text-sm">
            — With all my love, Gideon
          </p>
        </RevealSection>
      </section>

      {/* Reasons */}
      <section className="py-24 px-6 bg-gradient-to-b from-background via-valentine-soft/20 to-background relative z-10">
        <RevealSection className="max-w-lg mx-auto text-center mb-12">
          <h2 className="font-script text-3xl md:text-4xl text-valentine-deep">
            Reasons I love you 💗
          </h2>
        </RevealSection>
        <div className="max-w-md mx-auto space-y-4">
          {reasons.map((reason, i) => (
            <RevealSection key={i} delay={i * 150}>
              <div className="flex items-center gap-4 bg-background/60 backdrop-blur-sm rounded-2xl px-6 py-4 border border-valentine-soft/50 shadow-sm">
                <span className="text-2xl shrink-0">{reason.emoji}</span>
                <p className="text-foreground/80 text-base">{reason.text}</p>
              </div>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* Sweet promise */}
      <section className="py-24 px-6 relative z-10">
        <RevealSection className="max-w-md mx-auto text-center">
          <span className="text-5xl mb-6 block">🍝</span>
          <h2 className="font-script text-3xl md:text-4xl text-valentine-deep mb-4">
            My promise to you
          </h2>
          <p className="text-foreground/70 text-lg leading-relaxed">
            I, Gideon, promise to always be there for you, to make you laugh
            even on your worst days, and to buy you unlimited spaghetti for the
            rest of forever. Deal? 💕
          </p>
        </RevealSection>
      </section>

      {/* The Question */}
      <section className="py-24 px-6 relative z-10 bg-gradient-to-b from-background via-valentine-soft/30 to-background">
        <RevealSection className="max-w-md mx-auto text-center">
          <h2 className="font-script text-4xl md:text-5xl text-valentine-deep mb-4">
            So…
          </h2>
          <p className="text-foreground/60 text-lg mb-10">
            I have one very important question for you.
          </p>
          <h2 className="font-script text-4xl md:text-5xl text-valentine-deep mb-12">
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
        </RevealSection>
      </section>

      {/* Footer */}
      <footer className="py-16 text-center relative z-10">
        <RevealSection>
          <p className="font-script text-2xl text-valentine-mid opacity-60">
            Made with love, always.
          </p>
        </RevealSection>
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
      <AlertDialog open={showMusicPrompt} onOpenChange={setShowMusicPrompt}>
        <AlertDialogContent className="rounded-2xl border-valentine-soft bg-background max-w-sm mx-auto">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-script text-2xl text-valentine-deep text-center">
              One more thing 💕
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center text-base leading-relaxed text-foreground/80">
              Would you like some music while you read this?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="justify-center gap-4">
            <AlertDialogAction
              onClick={() => {
                if (audioRef.current) {
                  audioRef.current.loop = true;
                  audioRef.current.volume = 0.3;
                  // .play() returns a promise, it's good practice to catch errors
                  audioRef.current
                    .play()
                    .catch((e) => console.log("Audio play failed:", e));
                }
                setShowMusicPrompt(false);
              }}
              className="..."
            >
              Yes Baby 🎵
            </AlertDialogAction>

            <AlertDialogAction
              onClick={() => setShowMusicPrompt(false)}
              className="rounded-full border border-valentine-mid text-valentine-deep px-6"
            >
              Not really 🤫
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Index;
