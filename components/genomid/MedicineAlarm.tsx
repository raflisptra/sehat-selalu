"use client";
import { useState, useEffect } from "react";
import { 
  AlarmClock,
  AlarmClockPlus,
  BadgeCheck, 
  CheckCircle2,
  Clock,
  FileText,
  Hospital, 
  OctagonAlert,
  Pause,
  PauseCircle,
  Play,
  PlayCircle,
  Plus, 
  Trash2 
} from "lucide-react";
import { TbHistoryToggle } from "react-icons/tb";
import { MdOutlineFoodBank } from "react-icons/md";

interface MedAlarm {
  id: string;
  disease: string;
  medicine: string;
  dosage: string;
  time: string;
  notes: string;
  active: boolean;
}

const diseaseOptions = ["Hipertensi", "Diabetes", "Jantung", "Kolesterol", "Asam Urat", "TBC", "Asma", "Lainnya"];

const medicineByDisease: Record<string, string[]> = {
  "Hipertensi":  ["Amlodipine", "Lisinopril", "Losartan", "Bisoprolol", "Valsartan"],
  "Diabetes":    ["Metformin", "Glibenclamide", "Insulin", "Acarbose", "Sitagliptin"],
  "Jantung":     ["Aspirin", "Atorvastatin", "Ramipril", "Clopidogrel", "Digoxin"],
  "Kolesterol":  ["Simvastatin", "Atorvastatin", "Rosuvastatin", "Fenofibrate"],
  "Asam Urat":   ["Allopurinol", "Colchicine", "Probenecid", "Febuxostat"],
  "TBC":         ["Rifampicin", "Isoniazid", "Pyrazinamide", "Ethambutol"],
  "Asma":        ["Salbutamol", "Budesonide", "Montelukast", "Formoterol"],
  "Lainnya":     [],
};

export default function MedicineAlarm() {
  const [step, setStep] = useState<"form" | "list">("form");
  const [form, setForm] = useState({ disease: "", medicine: "", customMedicine: "", dosage: "", time: "", notes: "" });
  const [alarms, setAlarms] = useState<MedAlarm[]>([]);
  const [currentTime, setCurrentTime] = useState("");
  const [ringing, setRinging] = useState<MedAlarm | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const t = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
      setCurrentTime(t);
      alarms.forEach(alarm => {
        if (alarm.active && alarm.time === t) {
          setRinging(alarm);
        }
      });
    }, 10000);
    return () => clearInterval(interval);
  }, [alarms]);

  const addAlarm = () => {
    const medicineName = form.medicine === "lainnya" ? form.customMedicine : form.medicine;
    if (!form.disease || !medicineName || !form.time) return;
    const newAlarm: MedAlarm = {
      id: Date.now().toString(),
      disease: form.disease,
      medicine: medicineName,
      dosage: form.dosage,
      time: form.time,
      notes: form.notes,
      active: true,
    };
    setAlarms(prev => [...prev, newAlarm]);
    setForm({ disease: "", medicine: "", customMedicine: "", dosage: "", time: "", notes: "" });
    setStep("list");
  };

  const toggleAlarm = (id: string) => {
    setAlarms(prev => prev.map(a => a.id === id ? { ...a, active: !a.active } : a));
  };

  const deleteAlarm = (id: string) => {
    setAlarms(prev => prev.filter(a => a.id !== id));
  };

  const isFormValid = form.disease && (form.medicine && form.medicine !== "lainnya" ? true : form.customMedicine) && form.time;

  return (
    <div className="space-y-5">

      {ringing && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border-2 border-green-500 rounded-2xl p-8 text-center max-w-sm w-full">
            <div className="flex justify-center mb-4 animate-bounce"><AlarmClock size={56} className="text-green-400" /></div>
            <h3 className="text-2xl font-bold text-green-400 mb-1">Waktunya Minum Obat!</h3>
            <p className="text-white text-xl font-bold mb-1">{ringing.medicine}</p>
            <p className="text-gray-400 text-sm mb-1">{ringing.dosage}</p>
            <p className="text-gray-500 text-xs mb-6 flex items-center justify-center gap-1"><Hospital size={12} /> {ringing.disease} · {ringing.time}</p>
            {ringing.notes && <p className="text-gray-400 text-sm mb-4 bg-white/5 rounded-xl p-3 flex items-start gap-2"><FileText size={14} className="flex-shrink-0 mt-0.5" /> {ringing.notes}</p>}
            <button onClick={() => setRinging(null)}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2">
              <CheckCircle2 size={18} /> Sudah Diminum
            </button>
          </div>
        </div>
      )}

      <div className="flex gap-3">
        {[
          { key: "form", label: "Tambah Alarm", icon: <AlarmClockPlus size={14} /> },
          { key: "list", label: `Alarm Saya (${alarms.length})`, icon: <AlarmClock size={14} /> },
        ].map(tab => (
          <button key={tab.key} onClick={() => setStep(tab.key as "form" | "list")}
            className={`px-5 py-2 rounded-full text-sm font-semibold border transition flex items-center gap-2 ${step === tab.key ? "bg-purple-500 border-purple-500 text-white" : "bg-white/5 border-white/10 text-gray-400 hover:border-purple-500 hover:text-purple-400"}`}>
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {step === "form" && (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
          <h3 className="text-xl font-bold text-purple-400 flex items-center gap-2"><TbHistoryToggle size={20} /> Riwayat Penyakit & Set Alarm</h3>

          <div>
            <label className="text-sm text-gray-400 mb-1 block">Penyakit yang Diderita <span className="text-red-400">*</span></label>
            <select value={form.disease} onChange={e => setForm({ ...form, disease: e.target.value, medicine: "" })}
              className="w-full bg-gray-800 border border-white/10 rounded-xl px-4 py-2 text-white focus:border-purple-500 outline-none">
              <option value="">-- Pilih Penyakit --</option>
              {diseaseOptions.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>

          {form.disease && (
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Nama Obat <span className="text-red-400">*</span></label>
              <select value={form.medicine} onChange={e => setForm({ ...form, medicine: e.target.value })}
                className="w-full bg-gray-800 border border-white/10 rounded-xl px-4 py-2 text-white focus:border-purple-500 outline-none">
                <option value="">-- Pilih Obat --</option>
                {(medicineByDisease[form.disease] || []).map(m => <option key={m} value={m}>{m}</option>)}
                <option value="lainnya">Obat Lainnya (isi manual)</option>
              </select>

              {medicineByDisease[form.disease]?.length > 0 && (
                <div className="mt-2 bg-blue-500/10 border border-blue-500/30 rounded-xl p-3 text-sm text-blue-400 flex items-start gap-2">
                  <div className="flex-shrink-0 mt-0.5"><Plus size={14} className="rotate-45" /></div>
                  <div>
                    Saran obat umum untuk {form.disease}: {medicineByDisease[form.disease].join(", ")}
                    <p className="text-xs text-blue-500 mt-1">* Selalu ikuti resep dokter Anda</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {form.medicine === "lainnya" && (
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Nama Obat (Manual)</label>
              <input value={form.customMedicine}
                onChange={e => setForm({ ...form, customMedicine: e.target.value })}
                placeholder="Ketik nama obat..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white placeholder-gray-500 focus:border-purple-500 outline-none" />
            </div>
          )}

          <div>
            <label className="text-sm text-gray-400 mb-1 block">Dosis</label>
            <input value={form.dosage} onChange={e => setForm({ ...form, dosage: e.target.value })}
              placeholder="contoh: 1 tablet 2x sehari"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white placeholder-gray-500 focus:border-purple-500 outline-none" />
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-1 flex items-center gap-1.5"><AlarmClock size={14} /> Set Jam Alarm <span className="text-red-400">*</span></label>
            <input type="time" value={form.time}
              onChange={e => setForm({ ...form, time: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:border-purple-500 outline-none" />
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-1 block">Catatan Tambahan</label>
            <textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })}
              placeholder="contoh: diminum sesudah makan, jangan dengan jus jeruk"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white placeholder-gray-500 focus:border-purple-500 outline-none h-20 resize-none" />
          </div>

          <button onClick={addAlarm} disabled={!isFormValid}
            className="w-full bg-purple-500 hover:bg-purple-600 disabled:bg-gray-700 disabled:text-gray-500 text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2">
            <Plus size={18} /> Simpan & Aktifkan Alarm
          </button>
        </div>
      )}

      {step === "list" && (
        <div>
          {alarms.length === 0 ? (
            <div className="text-center py-12 text-gray-500 bg-white/5 border border-white/10 rounded-2xl">
              <div className="flex justify-center mb-3"><AlarmClock size={48} /></div>
              <p className="mb-4">Belum ada alarm. Tambahkan alarm pertama Anda!</p>
              <button onClick={() => setStep("form")}
                className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-xl transition flex items-center gap-2">
                <Plus size={18} /> Tambah Alarm
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="text-center text-gray-400 text-sm bg-white/5 border border-white/10 rounded-xl py-2 flex items-center justify-center gap-2">
                <Clock size={14} /> Waktu sekarang: <span className="text-purple-400 font-bold text-lg">{currentTime || "--:--"}</span>
              </div>

              {alarms.map(alarm => (
                <div key={alarm.id}
                  className={`rounded-2xl border p-5 transition ${alarm.active ? "border-purple-700 bg-purple-900/10" : "border-white/10 bg-white/5 opacity-60"}`}>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-3xl font-extrabold text-purple-400">{alarm.time}</span>
                        <span className={`text-xs px-2 py-1 rounded-full border flex items-center gap-1 ${alarm.active ? "bg-green-500/10 border-green-500 text-green-400" : "bg-gray-500/10 border-gray-500 text-gray-500"}`}>
                          {alarm.active ? <><BadgeCheck size={12} /> Aktif</> : <><Pause size={12} /> Nonaktif</>}
                        </span>
                      </div>
                      <p className="font-semibold text-white">{alarm.medicine}
                        {alarm.dosage && <span className="text-gray-400 text-sm font-normal"> · {alarm.dosage}</span>}
                      </p>
                      <p className="text-sm text-purple-400 flex items-center gap-1"><OctagonAlert size={12} /> {alarm.disease}</p>
                      {alarm.notes && <p className="text-xs text-gray-500 mt-1 flex items-start gap-1"><MdOutlineFoodBank size={12} className="flex-shrink-0 mt-0.5" /> {alarm.notes}</p>}
                    </div>
                    <div className="flex flex-col gap-2 ml-4">
                      <button onClick={() => toggleAlarm(alarm.id)}
                        className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition flex items-center justify-center">
                        {alarm.active ? <PauseCircle size={16} /> : <PlayCircle size={16} />}
                      </button>
                      <button onClick={() => deleteAlarm(alarm.id)}
                        className="text-xs bg-red-500/10 hover:bg-red-500/20 text-red-400 px-3 py-1.5 rounded-lg transition flex items-center justify-center">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <button onClick={() => setStep("form")}
                className="w-full bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-400 py-3 rounded-xl text-sm transition flex items-center justify-center gap-2">
                <Plus size={16} /> Tambah Alarm Lagi
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}