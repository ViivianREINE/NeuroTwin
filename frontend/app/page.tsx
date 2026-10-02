"use client";

import React, { useState, useEffect } from "react";
import { 
  Brain, 
  Activity, 
  UploadCloud, 
  LineChart as LineIcon, 
  FileText, 
  Sliders, 
  Award, 
  User, 
  Zap, 
  TrendingUp, 
  ShieldAlert, 
  Download, 
  CheckCircle,
  Clock,
  RefreshCw
} from "lucide-react";
import { 
  ResponsiveContainer, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  BarChart, 
  Bar
} from "recharts";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

// 35 Brain Wellness Questions split across 7 domains (5 questions each)
const WELLNESS_QUESTIONS = [
  // Memory (0-4)
  { id: 1, domain: "Memory", text: "How often do you misplace daily items (keys, glasses, wallet)?" , options: ["Never", "Rarely", "Occasionally", "Frequently", "Constantly"] },
  { id: 2, domain: "Memory", text: "Do you struggle to recall names of new acquaintances shortly after meeting?" , options: ["Never", "Rarely", "Occasionally", "Frequently", "Constantly"] },
  { id: 3, domain: "Memory", text: "How often do you rely on memory aids (lists, alarms) to execute standard tasks?" , options: ["Never", "Rarely", "Occasionally", "Frequently", "Constantly"] },
  { id: 4, domain: "Memory", text: "Do you experience 'tip-of-the-tongue' word finding blocks?" , options: ["Never", "Rarely", "Occasionally", "Frequently", "Constantly"] },
  { id: 5, domain: "Memory", text: "How well can you recall detailed events that occurred a week ago?" , options: ["Vividly", "Clearly", "Somewhat", "Vaguely", "Not at all"] },
  
  // Attention (5-9)
  { id: 6, domain: "Attention", text: "Do you find it difficult to sustain focus on long text articles?" , options: ["Never", "Rarely", "Occasionally", "Frequently", "Constantly"] },
  { id: 7, domain: "Attention", text: "How easily are you distracted by background ambient sounds or motion?" , options: ["Not at all", "Slightly", "Moderately", "Highly", "Instantly"] },
  { id: 8, domain: "Attention", text: "Do you struggle to multitask without losing track of your goals?" , options: ["Never", "Rarely", "Occasionally", "Frequently", "Constantly"] },
  { id: 9, domain: "Attention", text: "How often do you have to reread paragraphs to comprehend them?" , options: ["Never", "Rarely", "Occasionally", "Frequently", "Constantly"] },
  { id: 10, domain: "Attention", text: "Can you maintain intense concentration on a task for over 45 minutes?" , options: ["Effortlessly", "Usually", "Sometimes", "With difficulty", "Impossible"] },
  
  // Executive Function (10-14)
  { id: 11, domain: "Executive Function", text: "How effectively can you map out schedules for complex projects?" , options: ["Exceptionally", "Effectively", "Moderately", "Poorly", "Unable"] },
  { id: 12, domain: "Executive Function", text: "Do you struggle to make decisions when presented with multiple options?" , options: ["Never", "Rarely", "Occasionally", "Frequently", "Constantly"] },
  { id: 13, domain: "Executive Function", text: "How quickly can you adapt your plans when unexpected changes occur?" , options: ["Instantly", "Quickly", "Slowly", "With strain", "Completely freeze"] },
  { id: 14, domain: "Executive Function", text: "Do you find yourself procrastinating on tasks requiring high mental effort?" , options: ["Never", "Rarely", "Occasionally", "Frequently", "Constantly"] },
  { id: 15, domain: "Executive Function", text: "How well can you estimate time required to complete tasks?" , options: ["Accurately", "Usually close", "Sometimes off", "Regularly fail", "Chronically off"] },
  
  // Emotional Resilience (15-19)
  { id: 16, domain: "Emotional Resilience", text: "How quickly do you recover emotionally from a stressful event?" , options: ["Instantly", "Within hours", "By next day", "Several days", "Lingers weeks"] },
  { id: 17, domain: "Emotional Resilience", text: "Do you experience sudden unexplained mood fluctuations?" , options: ["Never", "Rarely", "Occasionally", "Frequently", "Constantly"] },
  { id: 18, domain: "Emotional Resilience", text: "How often do minor setbacks cause you to feel overwhelmed?" , options: ["Never", "Rarely", "Occasionally", "Frequently", "Constantly"] },
  { id: 19, domain: "Emotional Resilience", text: "Do you practice mindful stress reduction (meditation, breathing)?" , options: ["Daily", "Weekly", "Monthly", "Rarely", "Never"] },
  { id: 20, domain: "Emotional Resilience", text: "How would you rate your general sense of mental peace?" , options: ["Excellent", "Good", "Fair", "Low", "Extremely poor"] },
  
  // Sleep Wellness (20-24)
  { id: 21, domain: "Sleep Wellness", text: "How many hours of restful sleep do you log per night on average?" , options: ["8+ hours", "7-8 hours", "6-7 hours", "5-6 hours", "Less than 5"] },
  { id: 22, domain: "Sleep Wellness", text: "Do you wake up feeling refreshed and energized?" , options: ["Always", "Usually", "Sometimes", "Rarely", "Never"] },
  { id: 23, domain: "Sleep Wellness", text: "How frequently do you experience sleep disturbances (waking up mid-night)?" , options: ["Never", "Rarely", "Occasionally", "Frequently", "Constantly"] },
  { id: 24, domain: "Sleep Wellness", text: "Do you maintain a consistent bedtime schedule?" , options: ["Strictly", "Mostly", "Varies slightly", "Highly irregular", "No schedule"] },
  { id: 25, domain: "Sleep Wellness", text: "How often do you experience daytime drowsiness or fatigue?" , options: ["Never", "Rarely", "Occasionally", "Frequently", "Constantly"] },
  
  // Lifestyle Habit (25-29)
  { id: 26, domain: "Lifestyle Habit", text: "How many hours of physical cardiovascular exercise do you complete weekly?" , options: ["5+ hours", "3-5 hours", "1-3 hours", "Less than 1", "None"] },
  { id: 27, domain: "Lifestyle Habit", text: "How would you rate the nutritional quality of your daily diet?" , options: ["Perfect Mediterranean", "Healthy balanced", "Average standard", "High processed", "Highly unhealthy"] },
  { id: 28, domain: "Lifestyle Habit", text: "Do you consume alcohol excessively (more than 10 units per week)?" , options: ["Never", "Rarely", "Occasionally", "Regularly", "Excessively"] },
  { id: 29, domain: "Lifestyle Habit", text: "Do you consume nicotine products or smoke?" , options: ["Never", "Past smoker", "Vape occasionally", "Moderate smoker", "Heavy smoker"] },
  { id: 30, domain: "Lifestyle Habit", text: "How much water do you drink daily to support brain hydration?" , options: ["3L+", "2-3L", "1.5-2L", "1-1.5L", "Less than 1L"] },
  
  // Social Wellness (30-34)
  { id: 31, domain: "Social Wellness", text: "How frequently do you engage in meaningful social conversations?" , options: ["Multiple daily", "Daily", "Few times/week", "Weekly", "Rarely"] },
  { id: 32, domain: "Social Wellness", text: "Do you feel supported by a network of friends or family?" , options: ["Extremely", "Adequately", "Moderately", "Vaguely", "Isolated"] },
  { id: 33, domain: "Social Wellness", text: "How often do you participate in group activities or communities?" , options: ["Weekly+", "Monthly", "Few times/year", "Rarely", "Never"] },
  { id: 34, domain: "Social Wellness", text: "Do you experience feelings of loneliness or isolation?" , options: ["Never", "Rarely", "Occasionally", "Frequently", "Constantly"] },
  { id: 35, domain: "Social Wellness", text: "How open are you to making new friends or expanding social circles?" , options: ["Very open", "Somewhat open", "Neutral", "Hesitant", "Avoidant"] }
];

export default function NeuroTwinDX() {
  const [activeTab, setActiveTab] = useState("overview");
  
  // Global User Session State
  const [dashboardData, setDashboardData] = useState<any>({
    current_risk: 15.0,
    twin_health_index: 88.0,
    brain_age: 55,
    mri_classification: "Non Demented",
    mri_confidence: 95.0,
    radar_wellness_data: [],
    historical_risks: [],
    feature_importance: []
  });
  const [loading, setLoading] = useState(true);

  // Form states
  const [clinicalForm, setClinicalForm] = useState({
    age: 55,
    bmi: 24.2,
    smoking: false,
    alcohol: 2.0,
    sleep: 7.5,
    physical_activity: 4.0,
    memory_complaints: false,
    confusion: false
  });
  
  const [riskResult, setRiskResult] = useState<any>(null);
  const [explainResult, setExplainResult] = useState<any>(null);
  const [mriResult, setMriResult] = useState<any>(null);
  const [mriFile, setMriFile] = useState<File | null>(null);
  const [mriPreview, setMriPreview] = useState<string | null>(null);
  const [pdfCompiling, setPdfCompiling] = useState(false);

  // Simulation Sliders
  const [simSliders, setSimSliders] = useState({
    sleep: 5.5,
    exercise: 1.0,
    smoking: true,
    alcohol: 12.0,
    bmi: 28.5
  });
  const [simResult, setSimResult] = useState<any>(null);

  // Wellness Questionnaire slide control
  const [wellnessAnswers, setWellnessAnswers] = useState<string[]>(Array(35).fill("A"));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [wellnessResult, setWellnessResult] = useState<any>(null);

  // Load Dashboard Aggregate metrics
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/dashboard`);
      const data = await res.json();
      setDashboardData(data);
    } catch (e) {
      console.error("Error retrieving dashboard variables: ", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // API Call: Calculate Risk & Explain Predictions
  const handleClinicalPredict = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const resRisk = await fetch(`${API_BASE}/predict-risk`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(clinicalForm)
      });
      const riskData = await resRisk.json();
      setRiskResult(riskData);

      const resExplain = await fetch(`${API_BASE}/explain`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(clinicalForm)
      });
      const explainData = await resExplain.json();
      setExplainResult(explainData);
      
      // Update global dashboard context
      fetchDashboardData();
    } catch (err) {
      console.error(err);
    }
  };

  // API Call: Future Simulator Run
  const handleSimulationRun = async () => {
    try {
      const current_data = {
        age: clinicalForm.age,
        bmi: simSliders.bmi,
        smoking: simSliders.smoking,
        alcohol: simSliders.alcohol,
        sleep: simSliders.sleep,
        physical_activity: simSliders.exercise,
        memory_complaints: clinicalForm.memory_complaints,
        confusion: clinicalForm.confusion
      };

      const modified_data = {
        age: clinicalForm.age,
        bmi: 22.0, // Optimal benchmark BMI
        smoking: false, // Optimal smoke stop
        alcohol: 1.0, // Reduced units
        sleep: 8.0, // Optimized sleep
        physical_activity: 5.5, // Daily exercise
        memory_complaints: clinicalForm.memory_complaints,
        confusion: clinicalForm.confusion
      };

      const res = await fetch(`${API_BASE}/simulate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ current_data, modified_data })
      });
      const simData = await res.json();
      setSimResult(simData);
      fetchDashboardData();
    } catch (err) {
      console.error(err);
    }
  };

  // API Call: MRI Classifier Upload
  const handleMriUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mriFile) return;
    
    const formData = new FormData();
    formData.append("file", mriFile);
    
    try {
      const res = await fetch(`${API_BASE}/upload-mri`, {
        method: "POST",
        body: formData
      });
      const data = await res.json();
      setMriResult(data);
      fetchDashboardData();
    } catch (err) {
      console.error("Failed uploading MRI file scan: ", err);
    }
  };

  // API Call: Process Cognitive Wellness Evaluation
  const submitWellnessAssessment = async () => {
    try {
      const res = await fetch(`${API_BASE}/assessment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: wellnessAnswers })
      });
      const data = await res.json();
      setWellnessResult(data);
      fetchDashboardData();
    } catch (err) {
      console.error(err);
    }
  };

  // API Call: Generate Report Lab PDF Document
  const handleCompilePDF = async () => {
    try {
      setPdfCompiling(true);
      const res = await fetch(`${API_BASE}/generate-report`, { method: "POST" });
      const { pdf_base64 } = await res.json();
      
      const byteCharacters = atob(pdf_base64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "application/pdf" });
      
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = `NeuroTwinDX_Report_${clinicalForm.age}.pdf`;
      link.click();
    } catch (err) {
      console.error(err);
    } finally {
      setPdfCompiling(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground font-sans">
      
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-80 border-r border-card-border bg-card backdrop-blur-xl flex flex-col justify-between shrink-0">
        <div>
          {/* Brand Header */}
          <div className="p-6 flex items-center space-x-3 border-b border-card-border">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-neon to-brand-blue flex items-center justify-center shadow-neon-glow">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-extrabold text-xl tracking-tight text-white neon-text">NeuroTwinDX</h1>
              <p className="text-xs text-slate-400">Your Future Brain. Predicted Today.</p>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="p-4 space-y-2">
            {[
              { id: "overview", label: "Overview Twin", icon: Brain },
              { id: "clinical", label: "Clinical Predictor", icon: Activity },
              { id: "mri", label: "MRI Neural Classifier", icon: UploadCloud },
              { id: "simulation", label: "Lifestyle Simulator", icon: Sliders },
              { id: "wellness", label: "Wellness Diagnostic", icon: Award },
              { id: "reports", label: "Report Dossier", icon: FileText },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive 
                      ? "bg-brand-neon text-white shadow-neon-glow" 
                      : "text-slate-400 hover:bg-slate-800/40 hover:text-white"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Card */}
        <div className="p-4 border-t border-card-border bg-slate-950/40">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
              <User className="w-6 h-6 text-slate-400" />
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold text-white truncate">Alex Mercer</p>
              <span className="text-xs text-brand-emerald flex items-center">
                <span className="w-2 h-2 rounded-full bg-brand-emerald mr-1.5 animate-pulse"></span>
                Active Digital Twin
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN VIEWPORT */}
      <main className="flex-1 overflow-y-auto p-8 max-w-7xl mx-auto w-full">
        {loading ? (
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <RefreshCw className="w-10 h-10 text-brand-neon animate-spin mx-auto mb-3" />
              <p className="text-sm text-slate-400">Synchronizing Brain Digital Twin...</p>
            </div>
          </div>
        ) : (
          <>
            
            {/* OVERVIEW TWIN TAB */}
            {activeTab === "overview" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-extrabold text-white">Overview Twin</h2>
                  <p className="text-slate-400 text-sm">Real-time status aggregate compiled from AI risk projections and anatomical structural datasets.</p>
                </div>

                {/* Scorecards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="glass-panel p-6 relative overflow-hidden">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Clinical Risk Rating</span>
                      <Activity className="w-5 h-5 text-brand-rose" />
                    </div>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-3xl font-extrabold text-white">{dashboardData.current_risk.toFixed(1)}%</span>
                    </div>
                    <div className="mt-2 text-xs text-slate-400 flex items-center">
                      {dashboardData.current_risk > 35 ? (
                        <span className="text-brand-rose flex items-center">
                          <ShieldAlert className="w-3.5 h-3.5 mr-1" />
                          Elevated Susceptibility
                        </span>
                      ) : (
                        <span className="text-brand-emerald flex items-center">
                          <CheckCircle className="w-3.5 h-3.5 mr-1" />
                          Optimal Boundaries
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="glass-panel p-6 relative overflow-hidden border-brand-neon/30">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Twin Health Index</span>
                      <Zap className="w-5 h-5 text-brand-neon" />
                    </div>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-3xl font-extrabold text-white">{dashboardData.twin_health_index.toFixed(1)}</span>
                      <span className="text-xs text-slate-500">/ 100</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5 mt-3">
                      <div 
                        className="bg-gradient-to-r from-brand-neon to-brand-blue h-1.5 rounded-full" 
                        style={{ width: `${dashboardData.twin_health_index}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="glass-panel p-6 relative overflow-hidden">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Brain Biological Age</span>
                      <Brain className="w-5 h-5 text-brand-blue" />
                    </div>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-3xl font-extrabold text-white">{dashboardData.brain_age} yrs</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-2 flex items-center">
                      <Clock className="w-3.5 h-3.5 mr-1 text-slate-500" />
                      Calculated cognitive disparity
                    </p>
                  </div>

                  <div className="glass-panel p-6 relative overflow-hidden">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">MRI Morphology Match</span>
                      <Award className="w-5 h-5 text-brand-emerald" />
                    </div>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-xl font-extrabold text-white truncate max-w-full">{dashboardData.mri_classification}</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-2 flex items-center">
                      <CheckCircle className="w-3.5 h-3.5 mr-1 text-brand-emerald" />
                      Confidence: {dashboardData.mri_confidence.toFixed(1)}%
                    </p>
                  </div>
                </div>

                {/* Dashboard Main Visualizations */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Risk Profile & History Chart */}
                  <div className="glass-panel p-6">
                    <h3 className="text-base font-bold text-white mb-4 flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2 text-brand-rose" />
                      Risk Index Projection History
                    </h3>
                    <div className="h-72 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={dashboardData.historical_risks}>
                          <defs>
                            <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.4}/>
                              <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.0}/>
                            </linearGradient>
                          </defs>
                          <XAxis dataKey="month" stroke="#475569" fontSize={11} />
                          <YAxis stroke="#475569" fontSize={11} domain={[0, 100]} />
                          <Tooltip contentStyle={{ backgroundColor: "#1e293b", borderColor: "#334155" }} />
                          <Area type="monotone" dataKey="risk" stroke="#f43f5e" strokeWidth={2} fillOpacity={1} fill="url(#colorRisk)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Feature Importance Indicators */}
                  <div className="glass-panel p-6">
                    <h3 className="text-base font-bold text-white mb-4 flex items-center">
                      <Sliders className="w-5 h-5 mr-2 text-brand-neon" />
                      AI Global Feature Impact Factors (XGBoost SHAP)
                    </h3>
                    <div className="h-72 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={dashboardData.feature_importance} layout="vertical">
                          <XAxis type="number" stroke="#475569" fontSize={11} />
                          <YAxis dataKey="name" type="category" stroke="#475569" fontSize={10} width={120} />
                          <Tooltip contentStyle={{ backgroundColor: "#1e293b", borderColor: "#334155" }} />
                          <Bar dataKey="value" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* CLINICAL PREDICTOR TAB */}
            {activeTab === "clinical" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-extrabold text-white">Clinical Predictor</h2>
                  <p className="text-slate-400 text-sm">Calculates early-stage cognitive vulnerabilities using your clinical measurements fed to XGBoost.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Form input */}
                  <div className="glass-panel p-6 lg:col-span-1 h-fit">
                    <h3 className="text-lg font-bold text-white mb-4">Patient Parameters</h3>
                    <form onSubmit={handleClinicalPredict} className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1.5">Age</label>
                        <input 
                          type="number" 
                          value={clinicalForm.age} 
                          onChange={(e) => setClinicalForm({ ...clinicalForm, age: parseInt(e.target.value) || 55 })}
                          className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-neon" 
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1.5">BMI Value</label>
                        <input 
                          type="number" 
                          step="0.1" 
                          value={clinicalForm.bmi} 
                          onChange={(e) => setClinicalForm({ ...clinicalForm, bmi: parseFloat(e.target.value) || 24.0 })}
                          className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-neon" 
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1.5">Alcohol Consumption (units/week)</label>
                        <input 
                          type="number" 
                          step="0.1" 
                          value={clinicalForm.alcohol} 
                          onChange={(e) => setClinicalForm({ ...clinicalForm, alcohol: parseFloat(e.target.value) || 0.0 })}
                          className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-neon" 
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1.5">Sleep Hours (hrs/day)</label>
                        <input 
                          type="number" 
                          step="0.1" 
                          value={clinicalForm.sleep} 
                          onChange={(e) => setClinicalForm({ ...clinicalForm, sleep: parseFloat(e.target.value) || 7.0 })}
                          className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-neon" 
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1.5">Physical Activity (hrs/week)</label>
                        <input 
                          type="number" 
                          step="0.1" 
                          value={clinicalForm.physical_activity} 
                          onChange={(e) => setClinicalForm({ ...clinicalForm, physical_activity: parseFloat(e.target.value) || 3.0 })}
                          className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-neon" 
                        />
                      </div>

                      {/* Toggles */}
                      <div className="space-y-3 pt-2">
                        <label className="flex items-center space-x-3 cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={clinicalForm.smoking} 
                            onChange={(e) => setClinicalForm({ ...clinicalForm, smoking: e.target.checked })}
                            className="rounded bg-slate-900 border-slate-700 text-brand-neon focus:ring-0 focus:ring-offset-0" 
                          />
                          <span className="text-xs text-slate-400">Regular Tobacco Smoking</span>
                        </label>

                        <label className="flex items-center space-x-3 cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={clinicalForm.memory_complaints} 
                            onChange={(e) => setClinicalForm({ ...clinicalForm, memory_complaints: e.target.checked })}
                            className="rounded bg-slate-900 border-slate-700 text-brand-neon focus:ring-0 focus:ring-offset-0" 
                          />
                          <span className="text-xs text-slate-400">Experiencing Memory Complaints</span>
                        </label>

                        <label className="flex items-center space-x-3 cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={clinicalForm.confusion} 
                            onChange={(e) => setClinicalForm({ ...clinicalForm, confusion: e.target.checked })}
                            className="rounded bg-slate-900 border-slate-700 text-brand-neon focus:ring-0 focus:ring-offset-0" 
                          />
                          <span className="text-xs text-slate-400">Experiencing Episodes of Confusion</span>
                        </label>
                      </div>

                      <button 
                        type="submit" 
                        className="w-full bg-brand-neon text-white font-semibold py-2.5 rounded-lg text-sm mt-4 shadow-neon-glow hover:bg-opacity-90 transition-all duration-200"
                      >
                        Compute Risk Index
                      </button>
                    </form>
                  </div>

                  {/* Results Panel */}
                  <div className="lg:col-span-2 space-y-6">
                    {riskResult ? (
                      <>
                        {/* Summary panel */}
                        <div className="glass-panel p-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                          <div>
                            <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Projected Diagnostic Probability</span>
                            <div className="flex items-baseline space-x-3 mt-1">
                              <span className="text-4xl font-extrabold text-white">{riskResult.risk.toFixed(1)}%</span>
                              <span className="text-xs text-brand-rose">XGBoost Evaluation</span>
                            </div>
                            <p className="text-xs text-slate-400 mt-2">
                              Confidence of prediction model: {riskResult.confidence.toFixed(1)}% based on standard feature margins.
                            </p>
                          </div>
                          
                          <div className="p-4 bg-slate-950/30 rounded-lg border border-slate-800">
                            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1 flex items-center">
                              <Zap className="w-4 h-4 text-brand-neon mr-1.5" />
                              Clinical Impression
                            </h4>
                            <p className="text-xs text-slate-400 leading-relaxed">
                              {riskResult.risk > 35 
                                ? "Assessment highlights early biomarkers of cognitive decline. Recommended to prioritize lifestyle corrections and schedule standard clinical diagnostic screenings."
                                : "No current clinical markers of progressive cognitive decline detected. Continue healthy lifestyle interventions."
                              }
                            </p>
                          </div>
                        </div>

                        {/* Explainability visualization */}
                        {explainResult && (
                          <div className="glass-panel p-6">
                            <h3 className="text-sm font-bold text-white mb-4">Waterfall SHAP Explanations (Feature Impact Breakdown)</h3>
                            
                            <div className="space-y-3">
                              {explainResult.contributions.map((c: any) => {
                                const isPositive = c.effect >= 0;
                                return (
                                  <div key={c.feature} className="flex items-center justify-between text-xs">
                                    <span className="text-slate-400 w-28 font-medium">{c.feature}</span>
                                    <span className="text-slate-500 w-16 text-right">val: {c.value.toFixed(1)}</span>
                                    <div className="flex-1 mx-4 h-5 bg-slate-900 rounded relative overflow-hidden flex items-center">
                                      <div 
                                        className={`h-full ${isPositive ? "bg-brand-rose" : "bg-brand-emerald"}`}
                                        style={{ 
                                          width: `${Math.min(100, Math.abs(c.effect) * 4)}%`,
                                          marginLeft: isPositive ? "50%" : "auto",
                                          marginRight: isPositive ? "auto" : "50%"
                                        }}
                                      ></div>
                                    </div>
                                    <span className={`w-16 text-right font-semibold ${isPositive ? "text-brand-rose" : "text-brand-emerald"}`}>
                                      {isPositive ? "+" : ""}{c.effect.toFixed(1)}%
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                            
                            <div className="mt-4 pt-4 border-t border-slate-800 flex justify-between text-xs text-slate-500">
                              <span>Model Base Value: {explainResult.base_value.toFixed(2)}</span>
                              <span>Target Margin Output: {explainResult.prediction_value.toFixed(2)}</span>
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="glass-panel p-8 flex flex-col items-center justify-center min-h-[400px]">
                        <Activity className="w-12 h-12 text-slate-700 mb-3" />
                        <p className="text-slate-400 text-sm text-center">Complete parameters and run the prediction solver to generate early-stage diagnostic predictions.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* MRI CLASSIFIER TAB */}
            {activeTab === "mri" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-extrabold text-white">MRI Neural Classifier</h2>
                  <p className="text-slate-400 text-sm">Upload cross-sectional T2 MRI slices. Custom Residual CNN architecture computes predictions and outputs Grad-CAM attention heatmap.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Upload Panel */}
                  <div className="glass-panel p-6 lg:col-span-1 h-fit">
                    <h3 className="text-lg font-bold text-white mb-4">MRI Scan Submission</h3>
                    <form onSubmit={handleMriUpload} className="space-y-6">
                      
                      {/* Image Dropzone */}
                      <div className="border-2 border-dashed border-slate-700/80 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-brand-neon transition-colors duration-200 bg-slate-900/30">
                        <input 
                          type="file" 
                          accept="image/*" 
                          id="mri-file-input"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setMriFile(file);
                              setMriPreview(URL.createObjectURL(file));
                            }
                          }}
                          className="hidden" 
                        />
                        <label htmlFor="mri-file-input" className="flex flex-col items-center justify-center cursor-pointer w-full">
                          <UploadCloud className="w-10 h-10 text-slate-400 mb-2" />
                          <span className="text-xs font-semibold text-slate-300">Select MRI Grayscale Slice</span>
                          <span className="text-[10px] text-slate-500 mt-1">Accepts PNG, JPG, or DICOM files</span>
                        </label>
                      </div>

                      {mriPreview && (
                        <div className="mt-4 rounded-lg overflow-hidden border border-slate-700 bg-black max-w-[200px] mx-auto aspect-square relative">
                          <img src={mriPreview} alt="MRI Upload preview" className="object-cover w-full h-full" />
                        </div>
                      )}

                      <button 
                        type="submit" 
                        disabled={!mriFile}
                        className="w-full bg-brand-neon disabled:opacity-50 text-white font-semibold py-2.5 rounded-lg text-sm shadow-neon-glow hover:bg-opacity-90 transition-all duration-200"
                      >
                        Execute Classifications
                      </button>
                    </form>
                  </div>

                  {/* Classification Match Result */}
                  <div className="lg:col-span-2">
                    {mriResult ? (
                      <div className="space-y-6">
                        <div className="glass-panel p-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                          <div>
                            <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Morphological Matching Category</span>
                            <div className="text-2xl font-black text-white mt-1 uppercase tracking-tight">{mriResult.predicted_class}</div>
                            
                            <div className="flex items-baseline space-x-2 mt-2">
                              <span className="text-slate-400 text-xs">Prediction confidence level:</span>
                              <span className="text-sm font-bold text-brand-emerald">{mriResult.confidence.toFixed(1)}%</span>
                            </div>
                          </div>

                          <div className="p-4 bg-slate-950/30 rounded-lg border border-slate-800">
                            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1 flex items-center">
                              <Brain className="w-4 h-4 text-brand-emerald mr-1.5" />
                              Attention Analysis
                            </h4>
                            <p className="text-xs text-slate-400 leading-relaxed">
                              {mriResult.predicted_class === "Non Demented" 
                                ? "No ventricular enlargement or thinning of the cerebral cortex detected. Brain structure aligns with normal baselines."
                                : "CAM heatmaps highlight active focus spots inside the lateral ventricles and hippocampal parameters. Morphological boundaries indicate structural shrinkage."
                              }
                            </p>
                          </div>
                        </div>

                        {/* Image overlay display */}
                        <div className="glass-panel p-6">
                          <h3 className="text-sm font-bold text-white mb-4">Grad-CAM Spatial Focus Maps</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">
                            
                            <div>
                              <p className="text-xs text-slate-400 mb-2 text-center">Original Scan Slice</p>
                              <div className="w-48 h-48 bg-black rounded-lg border border-slate-800 overflow-hidden">
                                <img src={mriPreview || ""} alt="Original Scan" className="w-full h-full object-cover" />
                              </div>
                            </div>

                            <div>
                              <p className="text-xs text-slate-400 mb-2 text-center">Grad-CAM Overlay Heatmap</p>
                              <div className="w-48 h-48 bg-black rounded-lg border border-slate-800 overflow-hidden">
                                <img src={mriResult.heatmap_base64} alt="CAM Overlay" className="w-full h-full object-cover" />
                              </div>
                            </div>

                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="glass-panel p-8 flex flex-col items-center justify-center min-h-[400px]">
                        <Brain className="w-12 h-12 text-slate-700 mb-3" />
                        <p className="text-slate-400 text-sm text-center">Upload a T2 sagittal MRI slice to analyze structural integrity and view activations.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* LIFESTYLE SIMULATOR TAB */}
            {activeTab === "simulation" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-extrabold text-white">Lifestyle Simulator Workshop</h2>
                  <p className="text-slate-400 text-sm">Tune parameters to simulate healthy habit modifications. Dynamic projections compute actual changes using XGBoost.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Slider controls */}
                  <div className="glass-panel p-6 lg:col-span-1 space-y-6">
                    <h3 className="text-lg font-bold text-white">Habit Adjustments</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-xs mb-1.5">
                          <span className="text-slate-400 font-medium">Daily Sleep Range</span>
                          <span className="text-brand-neon font-semibold">{simSliders.sleep.toFixed(1)} hrs</span>
                        </div>
                        <input 
                          type="range" min="4" max="10" step="0.5"
                          value={simSliders.sleep}
                          onChange={(e) => setSimSliders({ ...simSliders, sleep: parseFloat(e.target.value) })}
                          className="w-full accent-brand-neon bg-slate-800" 
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs mb-1.5">
                          <span className="text-slate-400 font-medium">Weekly Exercise Volume</span>
                          <span className="text-brand-neon font-semibold">{simSliders.exercise.toFixed(1)} hrs</span>
                        </div>
                        <input 
                          type="range" min="0" max="15" step="0.5"
                          value={simSliders.exercise}
                          onChange={(e) => setSimSliders({ ...simSliders, exercise: parseFloat(e.target.value) })}
                          className="w-full accent-brand-neon bg-slate-800" 
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs mb-1.5">
                          <span className="text-slate-400 font-medium">Weekly Alcohol Dosage</span>
                          <span className="text-brand-neon font-semibold">{simSliders.alcohol.toFixed(1)} units</span>
                        </div>
                        <input 
                          type="range" min="0" max="30" step="1"
                          value={simSliders.alcohol}
                          onChange={(e) => setSimSliders({ ...simSliders, alcohol: parseFloat(e.target.value) })}
                          className="w-full accent-brand-neon bg-slate-800" 
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs mb-1.5">
                          <span className="text-slate-400 font-medium">Target BMI Index</span>
                          <span className="text-brand-neon font-semibold">{simSliders.bmi.toFixed(1)}</span>
                        </div>
                        <input 
                          type="range" min="15" max="40" step="0.5"
                          value={simSliders.bmi}
                          onChange={(e) => setSimSliders({ ...simSliders, bmi: parseFloat(e.target.value) })}
                          className="w-full accent-brand-neon bg-slate-800" 
                        />
                      </div>

                      <div className="pt-2">
                        <label className="flex items-center space-x-3 cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={simSliders.smoking} 
                            onChange={(e) => setSimSliders({ ...simSliders, smoking: e.target.checked })}
                            className="rounded bg-slate-900 border-slate-700 text-brand-neon focus:ring-0" 
                          />
                          <span className="text-xs text-slate-400 font-medium">Nicotine Consumption</span>
                        </label>
                      </div>
                    </div>

                    <button 
                      onClick={handleSimulationRun}
                      className="w-full bg-brand-neon text-white font-semibold py-2.5 rounded-lg text-sm shadow-neon-glow hover:bg-opacity-90 transition-all duration-200"
                    >
                      Project Projections
                    </button>
                  </div>

                  {/* Projection dashboard */}
                  <div className="lg:col-span-2">
                    {simResult ? (
                      <div className="space-y-6">
                        
                        {/* Comparison block */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="glass-panel p-6 text-center">
                            <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Current Brain Risk</span>
                            <div className="text-4xl font-extrabold text-brand-rose mt-2">{simResult.current_risk.toFixed(1)}%</div>
                          </div>

                          <div className="glass-panel p-6 text-center border-brand-emerald/30">
                            <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Projected Future Risk</span>
                            <div className="text-4xl font-extrabold text-brand-emerald mt-2">{simResult.future_risk.toFixed(1)}%</div>
                          </div>

                          <div className="glass-panel p-6 text-center bg-gradient-to-tr from-brand-neon/10 to-transparent">
                            <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Calculated Improvement</span>
                            <div className="text-4xl font-extrabold text-white mt-2 flex justify-center items-baseline">
                              <span>{simResult.improvement.toFixed(1)}%</span>
                              <span className="text-xs text-brand-emerald ml-1 font-bold">Less</span>
                            </div>
                          </div>
                        </div>

                        {/* Interactive Graph */}
                        <div className="glass-panel p-6">
                          <h3 className="text-sm font-bold text-white mb-4">Risk Disparity Chart</h3>
                          <div className="h-64 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                              <BarChart data={[
                                { name: "Current Risk Status", risk: simResult.current_risk, fill: "#f43f5e" },
                                { name: "Future Projected Status", risk: simResult.future_risk, fill: "#10b981" }
                              ]}>
                                <XAxis dataKey="name" stroke="#475569" fontSize={11} />
                                <YAxis stroke="#475569" fontSize={11} domain={[0, 100]} />
                                <Tooltip contentStyle={{ backgroundColor: "#1e293b", borderColor: "#334155" }} />
                                <Bar dataKey="risk" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
                              </BarChart>
                            </ResponsiveContainer>
                          </div>
                        </div>

                      </div>
                    ) : (
                      <div className="glass-panel p-8 flex flex-col items-center justify-center min-h-[400px]">
                        <Sliders className="w-12 h-12 text-slate-700 mb-3" />
                        <p className="text-slate-400 text-sm text-center">Modify habit configurations and trigger simulation projections to calculate future brain wellness shifts.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* WELLNESS ASSESSMENT TAB */}
            {activeTab === "wellness" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-extrabold text-white">Brain Wellness Diagnostic</h2>
                  <p className="text-slate-400 text-sm">35 multiple-choice cognitive tests across 7 operational domains mapping lifestyle variables.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Questionnaire Engine */}
                  <div className="glass-panel p-6 lg:col-span-1 h-fit">
                    <div className="flex justify-between items-center mb-4 border-b border-card-border pb-3">
                      <span className="text-xs font-semibold text-slate-400">Cognitive Screening Panel</span>
                      <span className="text-xs font-bold text-brand-neon bg-brand-neon/15 px-2.5 py-0.5 rounded-full">
                        Q: {currentQuestionIndex + 1} / 35
                      </span>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <span className="text-[10px] uppercase font-extrabold text-brand-blue tracking-widest">
                          {WELLNESS_QUESTIONS[currentQuestionIndex].domain}
                        </span>
                        <h4 className="text-base font-bold text-white mt-1 leading-snug">
                          {WELLNESS_QUESTIONS[currentQuestionIndex].text}
                        </h4>
                      </div>

                      {/* Options */}
                      <div className="space-y-3">
                        {WELLNESS_QUESTIONS[currentQuestionIndex].options.map((opt, i) => {
                          const optionChar = ['A', 'B', 'C', 'D', 'E'][i];
                          const isSelected = wellnessAnswers[currentQuestionIndex] === optionChar;
                          return (
                            <button
                              key={opt}
                              onClick={() => {
                                const newAns = [...wellnessAnswers];
                                newAns[currentQuestionIndex] = optionChar;
                                setWellnessAnswers(newAns);
                              }}
                              className={`w-full text-left px-4 py-3 rounded-lg text-xs font-semibold transition-all duration-150 border ${
                                isSelected 
                                  ? "bg-brand-neon/10 border-brand-neon text-white" 
                                  : "bg-slate-900/60 border-slate-700/50 text-slate-300 hover:bg-slate-800"
                              }`}
                            >
                              <span className="mr-2 text-brand-neon font-bold">{optionChar}.</span>
                              {opt}
                            </button>
                          );
                        })}
                      </div>

                      {/* Navigation */}
                      <div className="flex justify-between pt-4 border-t border-card-border">
                        <button
                          disabled={currentQuestionIndex === 0}
                          onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                          className="bg-slate-900 border border-slate-700 text-slate-300 text-xs px-3.5 py-2 rounded-lg hover:bg-slate-800 disabled:opacity-30 transition-all"
                        >
                          Back
                        </button>

                        {currentQuestionIndex < 34 ? (
                          <button
                            onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                            className="bg-brand-neon text-white text-xs px-3.5 py-2 rounded-lg hover:bg-opacity-90 shadow-neon-glow transition-all"
                          >
                            Next Question
                          </button>
                        ) : (
                          <button
                            onClick={submitWellnessAssessment}
                            className="bg-brand-emerald text-white text-xs px-4 py-2 rounded-lg hover:bg-opacity-90 shadow-emerald-glow font-bold transition-all"
                          >
                            Compile Diagnosis
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Results Panel */}
                  <div className="lg:col-span-2">
                    {wellnessResult ? (
                      <div className="space-y-6 animate-fadeIn">
                        
                        {/* Radar Chart */}
                        <div className="glass-panel p-6">
                          <h3 className="text-sm font-bold text-white mb-4">Operational Domain Metrics</h3>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            
                            <div className="h-64 w-full">
                              <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={wellnessResult.radar_data}>
                                  <PolarGrid stroke="#334155" />
                                  <PolarAngleAxis dataKey="subject" stroke="#94a3b8" fontSize={9} />
                                  <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" fontSize={8} />
                                  <Radar name="Cognitive Wellness" dataKey="score" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.35} />
                                </RadarChart>
                              </ResponsiveContainer>
                            </div>

                            <div className="space-y-3">
                              <div>
                                <span className="text-[10px] text-slate-400 uppercase font-extrabold tracking-wider">Overall Brain Wellness Rating</span>
                                <div className="text-4xl font-extrabold text-white">{wellnessResult.overall_score.toFixed(1)}%</div>
                              </div>

                              <div className="grid grid-cols-2 gap-4 pt-2">
                                {[
                                  { label: "Memory Score", val: wellnessResult.memory_score },
                                  { label: "Attention Focus", val: wellnessResult.attention_score },
                                  { label: "Executive Range", val: wellnessResult.executive_score },
                                  { label: "Sleep Wellness", val: wellnessResult.sleep_score },
                                  { label: "Lifestyle habits", val: wellnessResult.lifestyle_score },
                                  { label: "Social network", val: wellnessResult.social_score },
                                ].map((stat) => (
                                  <div key={stat.label} className="bg-slate-900/50 p-2.5 rounded border border-card-border">
                                    <p className="text-[9px] font-semibold text-slate-500 uppercase">{stat.label}</p>
                                    <p className="text-sm font-black text-white">{stat.val.toFixed(0)}%</p>
                                  </div>
                                ))}
                              </div>
                            </div>

                          </div>
                        </div>

                      </div>
                    ) : (
                      <div className="glass-panel p-8 flex flex-col items-center justify-center min-h-[400px]">
                        <Award className="w-12 h-12 text-slate-700 mb-3" />
                        <p className="text-slate-400 text-sm text-center">Complete the 35 cognitive diagnostic tests to generate multi-domain radar projections.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* DIAGNOSTIC DOSSIER REPORTS TAB */}
            {activeTab === "reports" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-extrabold text-white">Diagnostic Report Dossier</h2>
                  <p className="text-slate-400 text-sm">Compile and extract professional medical grade PDF diagnostics. Combines clinical predictions, MRI Grad-CAM attention regions, lifestyle modifications, and wellness matrices.</p>
                </div>

                <div className="max-w-2xl bg-card border border-card-border rounded-2xl p-8 relative overflow-hidden glass-panel">
                  <div className="flex flex-col items-center justify-center py-8 text-center space-y-4">
                    <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center shadow-lg">
                      <FileText className="w-8 h-8 text-brand-neon" />
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold text-white">Consolidated Diagnosis Dossier</h3>
                      <p className="text-xs text-slate-400 mt-1 max-w-sm">Generated dynamic PDF records leveraging scientific standard structures ready for professional review.</p>
                    </div>

                    <button 
                      onClick={handleCompilePDF}
                      disabled={pdfCompiling}
                      className="bg-brand-neon hover:bg-opacity-95 text-white font-bold text-sm px-6 py-3 rounded-xl flex items-center space-x-2.5 shadow-neon-glow transition-all"
                    >
                      {pdfCompiling ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Generating Dossier...</span>
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4" />
                          <span>Download Diagnostic PDF</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}

          </>
        )}
      </main>

    </div>
  );
}
