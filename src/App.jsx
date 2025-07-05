import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import "./App.css";

function App() {
  const [session, setSession] = useState(null);
  const [selectedMood, setSelectedMood] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const moods = [
    { emoji: "😊", label: "Happy" },
    { emoji: "😢", label: "Sad" },
    { emoji: "😠", label: "Angry" },
    { emoji: "😌", label: "Chill" },
    { emoji: "😍", label: "Flirty" },
    { emoji: "😔", label: "Lonely" },
    { emoji: "🥵", label: "Hot" },
    { emoji: "🔥", label: "Horny" },
    { emoji: "🤯", label: "Mindblown" },
    { emoji: "😴", label: "Sleepy" },
    { emoji: "🤓", label: "Nerdy" },
    { emoji: "🤪", label: "Crazy" },
    { emoji: "🥳", label: "Celebrating" },
    { emoji: "😇", label: "Blessed" },
    { emoji: "😎", label: "Cool" },
    { emoji: "😱", label: "Scared" },
    { emoji: "🤠", label: "Adventurous" },
    { emoji: "😭", label: "Heartbroken" },
    { emoji: "😤", label: "Motivated" },
    { emoji: "🍸", label: "Tipsy" },
    { emoji: "💋", label: "Kinky" },
    { emoji: "👀", label: "Curious" },
    { emoji: "👅", label: "Naughty" },
    { emoji: "🤑", label: "Greedy" },
    { emoji: "🫦", label: "Seductive" },
  ];

  useEffect(() => {
    // Fetch current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const fetchMessages = async () => {
    if (!selectedMood) return;
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("mood", selectedMood)
      .order("created_at", { ascending: true });
    if (error) console.error(error);
    else setMessages(data);
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !session) return;
    const { error } = await supabase.from("messages").insert([
      {
        user_id: session.user.id,
        mood: selectedMood,
        text: newMessage,
      },
    ]);
    if (error) console.error(error);
    else {
      setNewMessage("");
      fetchMessages();
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [selectedMood]);

  if (!session)
    return (
      <div className="auth-container">
        <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
      </div>
    );

  return (
    <div className="app-container">
      <h1 className="app-title">Vibewise 🔥</h1>

      {!selectedMood ? (
        <div className="mood-picker">
          <h2 className="section-title">Pick Your Mood</h2>
          <div className="mood-grid">
            {moods.map((mood) => (
              <button
                key={mood.label}
                className="mood-button"
                onClick={() => setSelectedMood(mood.label)}
              >
                <span className="mood-emoji">{mood.emoji}</span> {mood.label}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="chatroom">
          <h2 className="section-title">Chatroom: {selectedMood}</h2>
          <div className="messages-box">
            {messages.length === 0 ? (
              <p className="empty-message">No messages yet. Be the first!</p>
            ) : (
              messages.map((m) => (
                <div key={m.id} className="message">
                  <strong>{m.user_id === session.user.id ? "You" : m.user_id}:</strong> {m.text}
                  <span className="timestamp">
                    ({new Date(m.created_at).toLocaleTimeString()})
                  </span>
                </div>
              ))
            )}
          </div>
          <div className="input-area">
            <input
              className="text-input"
              type="text"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button className="send-button" onClick={handleSendMessage}>
              Send
            </button>
          </div>
          <div className="actions">
            <button className="action-button" onClick={() => setSelectedMood(null)}>
              Change Mood
            </button>
            <button className="action-button" onClick={() => supabase.auth.signOut()}>
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
