import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Terms() {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="px-8 py-6 border-b-2 border-black">
        <div className="max-w-4xl mx-auto">
          <Link to="/p/flonk" className="text-xl font-bold tracking-tighter hover:opacity-70 transition-opacity">
            ← BACK TO FLONK
          </Link>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-8 py-16">
        <motion.h1
          className="text-5xl md:text-7xl font-black tracking-tighter mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          TERMS OF SERVICE
        </motion.h1>

        <motion.div
          className="space-y-8 text-lg leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <p className="text-sm opacity-70">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <section>
            <h2 className="text-3xl font-bold mb-4">1. Acceptance of Terms</h2>
            <p className="opacity-80">
              By downloading, installing, or using FLONK ("the Game"), you agree to be bound by these Terms of Service.
              If you do not agree to these terms, please do not use the Game.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">2. License Grant</h2>
            <p className="opacity-80">
              Franz Benthin grants you a limited, non-exclusive, non-transferable, revocable license to use the Game
              for personal, non-commercial purposes in accordance with these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">3. User Conduct</h2>
            <p className="opacity-80 mb-4">You agree not to:</p>
            <ul className="list-disc list-inside space-y-2 opacity-80 ml-4">
              <li>Modify, reverse engineer, or decompile the Game</li>
              <li>Use cheats, exploits, or automation software</li>
              <li>Attempt to gain unauthorized access to the Game's systems</li>
              <li>Harass, abuse, or harm other players</li>
              <li>Use the Game for any illegal purposes</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">4. Intellectual Property</h2>
            <p className="opacity-80">
              All content, features, and functionality of the Game are owned by Franz Benthin and are protected by
              international copyright, trademark, and other intellectual property laws.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">5. In-App Purchases</h2>
            <p className="opacity-80">
              The Game may offer in-app purchases. All purchases are final and non-refundable except as required by law.
              Prices are subject to change without notice.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">6. Termination</h2>
            <p className="opacity-80">
              We reserve the right to terminate or suspend your access to the Game at any time, without prior notice,
              for conduct that we believe violates these Terms or is harmful to other users or us.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">7. Disclaimer of Warranties</h2>
            <p className="opacity-80">
              The Game is provided "as is" without warranties of any kind, either express or implied. We do not
              guarantee that the Game will be uninterrupted, secure, or error-free.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">8. Limitation of Liability</h2>
            <p className="opacity-80">
              Franz Benthin shall not be liable for any indirect, incidental, special, consequential, or punitive
              damages resulting from your use or inability to use the Game.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">9. Changes to Terms</h2>
            <p className="opacity-80">
              We reserve the right to modify these Terms at any time. Continued use of the Game after changes
              constitutes acceptance of the modified Terms.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">10. Contact Information</h2>
            <p className="opacity-80">
              For questions about these Terms, please contact us at:{' '}
              <a href="mailto:hi@franz.cx" className="underline hover:opacity-70">
                hi@franz.cx
              </a>
            </p>
          </section>
        </motion.div>

        {/* Footer Links */}
        <motion.div
          className="mt-16 pt-8 border-t-2 border-black flex gap-6 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Link to="/p/flonk/privacy" className="hover:opacity-70 transition-opacity">
            Privacy Policy
          </Link>
          <Link to="/p/flonk/eula" className="hover:opacity-70 transition-opacity">
            EULA
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
