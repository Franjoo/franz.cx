import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Eula() {
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
          END USER LICENSE AGREEMENT
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
            <p className="opacity-80">
              This End User License Agreement ("Agreement") is a legal agreement between you and Franz Benthin
              ("Licensor") for the use of FLONK ("the Application").
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">1. Grant of License</h2>
            <p className="opacity-80">
              Subject to the terms of this Agreement, Licensor grants you a limited, non-exclusive, non-transferable,
              revocable license to download, install, and use the Application for your personal, non-commercial use
              on any device that you own or control.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">2. License Restrictions</h2>
            <p className="opacity-80 mb-4">You shall not:</p>
            <ul className="list-disc list-inside space-y-2 opacity-80 ml-4">
              <li>Copy, modify, or create derivative works of the Application</li>
              <li>Distribute, transfer, sublicense, lease, lend, or rent the Application</li>
              <li>Reverse engineer, decompile, or disassemble the Application</li>
              <li>Remove, alter, or obscure any proprietary notices on the Application</li>
              <li>Use the Application for any commercial purpose without explicit permission</li>
              <li>Use the Application in any way that violates applicable laws or regulations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">3. Intellectual Property Rights</h2>
            <p className="opacity-80">
              The Application, including all content, features, and functionality, is owned by Franz Benthin and is
              protected by copyright, trademark, patent, trade secret, and other intellectual property laws. This
              Agreement does not grant you any rights to trademarks or service marks of the Licensor.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">4. Updates and Modifications</h2>
            <p className="opacity-80">
              Licensor may provide updates, patches, or modifications to the Application. You agree that such updates
              may be automatically downloaded and installed without additional notice. Licensor reserves the right to
              modify or discontinue the Application at any time.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">5. Data Collection and Privacy</h2>
            <p className="opacity-80">
              The Application may collect certain data as described in our{' '}
              <Link to="/p/flonk/privacy" className="underline hover:opacity-70">
                Privacy Policy
              </Link>
              . By using the Application, you consent to such data collection and use.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">6. Third-Party Services</h2>
            <p className="opacity-80">
              The Application may integrate with or provide access to third-party services. Your use of such services
              is subject to their respective terms and conditions. Licensor is not responsible for any third-party
              services or content.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">7. Disclaimer of Warranties</h2>
            <p className="opacity-80">
              THE APPLICATION IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR
              IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
              AND NON-INFRINGEMENT. LICENSOR DOES NOT WARRANT THAT THE APPLICATION WILL BE UNINTERRUPTED OR ERROR-FREE.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">8. Limitation of Liability</h2>
            <p className="opacity-80">
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL LICENSOR BE LIABLE FOR ANY INDIRECT,
              INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER
              INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">9. Termination</h2>
            <p className="opacity-80">
              This Agreement is effective until terminated. Your rights under this Agreement will terminate
              automatically without notice if you fail to comply with any term of this Agreement. Upon termination,
              you must cease all use of the Application and delete all copies.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">10. Governing Law</h2>
            <p className="opacity-80">
              This Agreement shall be governed by and construed in accordance with the laws of Germany, without regard
              to its conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">11. Entire Agreement</h2>
            <p className="opacity-80">
              This Agreement constitutes the entire agreement between you and Licensor regarding the Application and
              supersedes all prior agreements and understandings.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">12. Contact Information</h2>
            <p className="opacity-80">
              If you have any questions about this EULA, please contact:{' '}
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
          <Link to="/p/flonk/terms" className="hover:opacity-70 transition-opacity">
            Terms of Service
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
