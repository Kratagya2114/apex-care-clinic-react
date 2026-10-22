import React, { useState } from 'react';
import { 
  Phone, Calendar, Clock, MapPin, Shield, Star, CheckCircle, 
  ChevronDown, Award, Users, Stethoscope, HeartPulse, Brain, 
  Activity, ArrowRight, UserCheck, Search, Filter, AlertCircle, X, Check, Calculator
} from 'lucide-react';

export default function App() {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedService, setSelectedService] = useState('All');
  const [bookingStep, setBookingStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    doctor: '',
    department: 'General Cardiology',
    date: '2026-10-22',
    timeSlot: '',
    patientName: '',
    phone: '',
    email: '',
    notes: '',
    insurance: 'Yes'
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  // Health Calculator State
  const [bmi, setBmi] = useState({ height: '', weight: '', result: null, category: '' });

  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Jenkins",
      title: "Chief of Cardiology",
      dept: "Cardiology",
      exp: "16+ Yrs Exp",
      rating: "4.9",
      reviews: 320,
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600",
      bio: "Board-certified cardiologist specializing in preventive cardiology and advanced non-invasive diagnostic imaging.",
      availability: ["Mon", "Wed", "Fri"]
    },
    {
      id: 2,
      name: "Dr. Marcus Vance",
      title: "Senior Neurologist",
      dept: "Neurology",
      exp: "14+ Yrs Exp",
      rating: "4.8",
      reviews: 210,
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600",
      bio: "Expert in neuro-diagnostics, chronic migraine management, and rehabilitation for stroke recovery.",
      availability: ["Tue", "Thu", "Sat"]
    },
    {
      id: 3,
      name: "Dr. Elena Rostova",
      title: "Lead Pediatrician",
      dept: "Pediatrics",
      exp: "12+ Yrs Exp",
      rating: "5.0",
      reviews: 450,
      image: "https://images.unsplash.com/photo-1594824813572-c5188a101f30?auto=format&fit=crop&q=80&w=600",
      bio: "Dedicated pediatric specialist committed to compassionate child healthcare and preventive wellness programs.",
      availability: ["Mon", "Tue", "Thu", "Fri"]
    },
    {
      id: 4,
      name: "Dr. Jonathan Reyes",
      title: "Orthopedic Surgeon",
      dept: "Orthopedics",
      exp: "18+ Yrs Exp",
      rating: "4.9",
      reviews: 280,
      image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=600",
      bio: "Specialist in joint replacement procedures, sports medicine injuries, and arthroscopic reconstructions.",
      availability: ["Wed", "Fri", "Sat"]
    }
  ];

  const timeSlots = [
    { time: "09:00 AM", available: true },
    { time: "10:00 AM", available: true },
    { time: "11:30 AM", available: false },
    { time: "02:00 PM", available: true },
    { time: "03:30 PM", available: true },
    { time: "05:00 PM", available: true }
  ];

  const calculateBmi = (e) => {
    e.preventDefault();
    if (bmi.height && bmi.weight) {
      const hMeters = parseFloat(bmi.height) / 100;
      const bmiVal = (parseFloat(bmi.weight) / (hMeters * hMeters)).toFixed(1);
      let cat = "";
      if (bmiVal < 18.5) cat = "Underweight";
      else if (bmiVal < 25) cat = "Normal weight";
      else if (bmiVal < 30) cat = "Overweight";
      else cat = "Obese";

      setBmi({ ...bmi, result: bmiVal, category: cat });
    }
  };

  const handleOpenBooking = (docName = '') => {
    if (docName) {
      setBookingData(prev => ({ ...prev, doctor: docName }));
    }
    setIsModalOpen(true);
  };

  const handleBookSubmit = (e) => {
    e.preventDefault();
    setBookingConfirmed(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Top Emergency Bar */}
      <div className="bg-navy-900 text-slate-200 text-xs sm:text-sm py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-mx auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-teal-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping"></span>
              Emergency Line 24/7
            </span>
            <span className="hidden md:inline text-slate-400">|</span>
            <a href="tel:+18005550199" className="hover:text-white transition flex items-center gap-1 font-mono font-bold">
              <Phone className="w-3.5 h-3.5 text-teal-400" /> +1 (800) 555-0199
            </a>
          </div>
          <div className="flex items-center gap-6 text-slate-300">
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-teal-400" /> Mon - Sat: 8:00 AM - 8:00 PM</span>
            <span className="hidden lg:flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-teal-400" /> 742 Medical Plaza, NY</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-teal-600 to-teal-400 flex items-center justify-center text-white shadow-lg shadow-teal-500/20">
              <HeartPulse className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-extrabold text-navy-900 tracking-tight block leading-tight">ApexCare</span>
              <span className="text-xs font-semibold text-teal-600 tracking-widest uppercase block">Medical Clinic</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 font-medium text-slate-600 text-sm">
            <a href="#about" className="hover:text-teal-600 transition">About Us</a>
            <a href="#services" className="hover:text-teal-600 transition">Specialties</a>
            <a href="#doctors" className="hover:text-teal-600 transition">Doctors</a>
            <a href="#tools" className="hover:text-teal-600 transition">Health Tools</a>
            <a href="#faq" className="hover:text-teal-600 transition">FAQ</a>
          </div>

          <button 
            onClick={() => handleOpenBooking()}
            className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-5 py-2.5 rounded-xl shadow-md shadow-teal-600/20 hover:shadow-lg transition-all flex items-center gap-2 text-sm"
          >
            <Calendar className="w-4 h-4" /> Book Appointment
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden bg-gradient-to-b from-teal-50/50 to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-100/80 text-teal-800 text-xs font-bold tracking-wide">
                <Shield className="w-4 h-4 text-teal-600" /> Board Certified Medical Specialists
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-navy-900 tracking-tight leading-tight">
                Advanced Healthcare <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-500">
                  Tailored For Your Family
                </span>
              </h1>
              <p className="text-slate-600 text-lg leading-relaxed max-w-2xl">
                Experience world-class medical care with state-of-the-art diagnostic technology, top certified specialists, and an instant online time-slot booking experience.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => handleOpenBooking()}
                  className="bg-navy-900 hover:bg-slate-800 text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-navy-900/10 hover:shadow-xl transition-all flex items-center justify-center gap-3 text-base"
                >
                  <Calendar className="w-5 h-5 text-teal-400" /> Book Time Slot Now
                </button>
                <a 
                  href="#doctors"
                  className="bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-semibold px-7 py-4 rounded-xl transition-all flex items-center justify-center gap-2 text-base"
                >
                  Meet Specialists <ArrowRight className="w-4 h-4 text-slate-400" />
                </a>
              </div>

              {/* Stats */}
              <div className="pt-8 grid grid-cols-3 gap-6 border-t border-slate-200/80">
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-navy-900">15+</p>
                  <p className="text-xs text-slate-500 font-medium">Years Experience</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-navy-900">25k+</p>
                  <p className="text-xs text-slate-500 font-medium">Happy Patients</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-navy-900">99.8%</p>
                  <p className="text-xs text-slate-500 font-medium">Satisfaction Rate</p>
                </div>
              </div>
            </div>

            {/* Real Unsplash Hero Image with Badges */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                  <img 
                    src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800" 
                    alt="Modern Clinic Interior" 
                    className="w-full h-[460px] object-cover"
                  />
                </div>
                
                {/* Floating Rating Card */}
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500">
                    <Star className="w-6 h-6 fill-amber-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1 font-bold text-slate-800 text-sm">
                      4.9 / 5.0 Rating
                    </div>
                    <p className="text-xs text-slate-500">From 1,200+ Verified Reviews</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Doctors Grid Section */}
      <section id="doctors" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-teal-600 font-bold uppercase text-xs tracking-wider">Expert Medical Team</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 mt-2">Meet Our Lead Specialists</h2>
            <p className="text-slate-600 mt-3 text-sm sm:text-base">
              Board-certified practitioners available for in-person and telehealth consultations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {doctors.map((doc) => (
              <div key={doc.id} className="bg-slate-50 rounded-2xl border border-slate-200/80 overflow-hidden hover:shadow-xl transition duration-300 flex flex-col justify-between group">
                <div>
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={doc.image} 
                      alt={doc.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-slate-700 flex items-center gap-1 shadow-sm">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {doc.rating} ({doc.reviews})
                    </div>
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">{doc.dept}</span>
                    <h3 className="text-lg font-bold text-navy-900 mt-1">{doc.name}</h3>
                    <p className="text-xs font-semibold text-slate-500 mb-2">{doc.title} • {doc.exp}</p>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">{doc.bio}</p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button 
                    onClick={() => handleOpenBooking(doc.name)}
                    className="w-full bg-white hover:bg-teal-600 text-teal-700 hover:text-white border border-teal-600 font-bold py-2.5 rounded-xl transition text-xs flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-3.5 h-3.5" /> Book Slot with {doc.name.split(' ')[1]}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Health Calculator Tool */}
      <section id="tools" className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-teal-400 font-bold uppercase text-xs tracking-wider">Patient Health Tools</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Interactive BMI Health Calculator</h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Body Mass Index (BMI) is a quick screening estimate of body fat. Enter your details below to check your range, or consult with our cardiologists for personalized nutrition guidance.
              </p>
            </div>

            <div className="lg:col-span-6 bg-slate-800/90 p-8 rounded-3xl border border-slate-700 shadow-2xl">
              <form onSubmit={calculateBmi} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">Height (cm)</label>
                    <input 
                      type="number" 
                      placeholder="e.g. 175" 
                      value={bmi.height}
                      onChange={(e) => setBmi({...bmi, height: e.target.value})}
                      required
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">Weight (kg)</label>
                    <input 
                      type="number" 
                      placeholder="e.g. 70" 
                      value={bmi.weight}
                      onChange={(e) => setBmi({...bmi, weight: e.target.value})}
                      required
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-teal-500"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold py-3.5 rounded-xl transition flex items-center justify-center gap-2 text-sm"
                >
                  <Calculator className="w-4 h-4" /> Calculate BMI
                </button>
              </form>

              {bmi.result && (
                <div className="mt-6 p-4 rounded-2xl bg-slate-900 border border-teal-500/30 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 font-semibold block">Your Body Mass Index</span>
                    <span className="text-2xl font-extrabold text-teal-400">{bmi.result}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 font-semibold block">Category</span>
                    <span className="text-sm font-bold text-white px-3 py-1 bg-teal-900/60 rounded-full border border-teal-500/30">
                      {bmi.category}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => { setIsModalOpen(false); setBookingConfirmed(false); }}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition"
            >
              <X className="w-6 h-6" />
            </button>

            {!bookingConfirmed ? (
              <div>
                <div className="mb-6">
                  <span className="text-xs font-bold text-teal-600 uppercase tracking-widest">Interactive Booking</span>
                  <h3 className="text-2xl font-extrabold text-navy-900 mt-1">Schedule Appointment</h3>
                  <p className="text-xs text-slate-500">Select a slot and enter patient details for instant confirmation.</p>
                </div>

                <form onSubmit={handleBookSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Select Doctor / Specialist</label>
                    <select 
                      value={bookingData.doctor}
                      onChange={(e) => setBookingData({...bookingData, doctor: e.target.value})}
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                      <option value="">Any Available Specialist</option>
                      {doctors.map(d => <option key={d.id} value={d.name}>{d.name} ({d.dept})</option>)}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Preferred Date</label>
                      <input 
                        type="date" 
                        value={bookingData.date}
                        onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                        required
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Department</label>
                      <select 
                        value={bookingData.department}
                        onChange={(e) => setBookingData({...bookingData, department: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                      >
                        <option>General Cardiology</option>
                        <option>Neurology</option>
                        <option>Pediatrics</option>
                        <option>Orthopedics</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">Available Time Slots</label>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map((slot, i) => (
                        <button
                          type="button"
                          key={i}
                          disabled={!slot.available}
                          onClick={() => setBookingData({...bookingData, timeSlot: slot.time})}
                          className={`py-2 px-3 rounded-xl text-xs font-bold border transition ${
                            !slot.available 
                              ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed line-through'
                              : bookingData.timeSlot === slot.time
                              ? 'bg-teal-600 text-white border-teal-600 shadow-md'
                              : 'bg-white border-slate-200 text-slate-700 hover:border-teal-500'
                          }`}
                        >
                          {slot.time}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                      <input 
                        type="text" 
                        placeholder="John Doe" 
                        required
                        value={bookingData.patientName}
                        onChange={(e) => setBookingData({...bookingData, patientName: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                      <input 
                        type="tel" 
                        placeholder="+1 (555) 000-0000" 
                        required
                        value={bookingData.phone}
                        onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    disabled={!bookingData.timeSlot}
                    className="w-full mt-4 bg-teal-600 hover:bg-teal-700 disabled:bg-slate-300 text-white font-bold py-3.5 rounded-xl shadow-lg transition text-sm flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" /> Confirm Time Slot Booking
                  </button>
                </form>
              </div>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>
                <h3 className="text-2xl font-extrabold text-navy-900">Appointment Confirmed!</h3>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  We have reserved your time slot. A SMS confirmation has been sent to <span className="font-bold text-slate-800">{bookingData.phone}</span>.
                </p>

                <div className="bg-slate-50 p-4 rounded-2xl text-left border border-slate-200 text-xs space-y-2">
                  <div className="flex justify-between"><span className="text-slate-500">Doctor:</span> <span className="font-bold text-slate-800">{bookingData.doctor || "Assigned Specialist"}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Date:</span> <span className="font-bold text-slate-800">{bookingData.date}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Time:</span> <span className="font-bold text-teal-600">{bookingData.timeSlot}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Patient:</span> <span className="font-bold text-slate-800">{bookingData.patientName}</span></div>
                </div>

                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="w-full bg-navy-900 text-white font-bold py-3 rounded-xl hover:bg-slate-800 transition text-sm"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-navy-950 text-slate-400 py-12 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="flex justify-center items-center gap-2 text-white font-extrabold text-lg">
            <HeartPulse className="w-5 h-5 text-teal-400" /> ApexCare Medical Clinic
          </div>
          <p>© 2026 ApexCare Health Services. All rights reserved. Certified Medical Facility.</p>
        </div>
      </footer>
    </div>
  );
}