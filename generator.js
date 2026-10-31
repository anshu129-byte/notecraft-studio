// AI & Offline Smart Note Generator Engine

const SMART_TOPIC_KNOWLEDGE = {
  "osi": {
    title: "OSI 7-Layer Reference Model",
    subtitle: "Computer Networking • Protocol Stack Cheatsheet",
    tag: "Networking",
    theme: "notion",
    content: `# 🌐 OSI 7-LAYER REFERENCE MODEL
*Computer Networking Architecture & Protocol Stack*

---

> [!KEY] Fundamental Purpose
> The Open Systems Interconnection (OSI) model standardizes telecommunication and computing functions into seven abstract layers, ensuring interoperability across disparate hardware and software vendors.

---

## 1. The 7 Layers Breakdown

| Layer # | Layer Name | Data Unit (PDU) | Key Protocols & Devices | Primary Function |
| :---: | :--- | :---: | :--- | :--- |
| **7** | **Application** | Data | HTTP, HTTPS, DNS, SSH, FTP | User-facing network services & APIs |
| **6** | **Presentation**| Data | SSL/TLS, JPEG, ASCII, MPEG | Data encryption, compression & syntax translation |
| **5** | **Session** | Data | NetBIOS, RPC, SOCKS | Dialogue control, authentication, session state |
| **4** | **Transport** | **Segment** | TCP, UDP | End-to-end reliability, flow control & port addressing |
| **3** | **Network** | **Packet** | IP (IPv4/IPv6), ICMP, Routers | Logical addressing & optimal path routing |
| **2** | **Data Link** | **Frame** | Ethernet, Wi-Fi (802.11), Switches | Physical MAC addressing & error detection (CRC) |
| **1** | **Physical** | **Bit** | Cables, Fiber, Hubs, Repeaters | Raw electrical/optical bit transmission |

> [!TRICK] Top-to-Bottom Mnemonic
> **"All People Seem To Need Data Processing"**
> (Application → Presentation → Session → Transport → Network → Data Link → Physical)
> 
> Bottom-to-Top: **"Please Do Not Throw Sausage Pizza Away"**!

---

## 2. TCP vs. UDP Comparison

| Metric | TCP (Transmission Control Protocol) | UDP (User Datagram Protocol) |
| :--- | :--- | :--- |
| **Connection** | Connection-oriented (3-way handshake) | Connectionless |
| **Reliability** | Guaranteed delivery (retransmission) | Best-effort (packets may drop) |
| **Ordering** | In-order delivery guaranteed | Packets may arrive out of order |
| **Header Size** | 20 – 60 bytes | 8 bytes (ultra lightweight) |
| **Speed** | Slower (overhead for ACKs) | Extremely fast & low latency |
| **Use Cases** | Web pages (HTTP/S), Email, File transfers | Gaming, Video streaming (VoIP), DNS |

---

## 3. Data Encapsulation Process

When sending data down the protocol stack:
1. **Application Data** is generated.
2. Transport Layer appends port numbers $\rightarrow$ **Segment**.
3. Network Layer appends source & destination IP addresses $\rightarrow$ **Packet**.
4. Data Link Layer adds source/destination MAC addresses & Trailer CRC $\rightarrow$ **Frame**.
5. Physical Layer converts frame into electrical voltages or light pulses $\rightarrow$ **Bits**.

---

## 4. ⚡ Quick Revision Checklist

- [x] **Routers** operate at Layer 3 (Network - IP addresses).
- [x] **Switches** operate at Layer 2 (Data Link - MAC addresses).
- [x] **Hubs & Repeaters** operate at Layer 1 (Physical - Bits).
- [x] **TCP 3-Way Handshake:** SYN $\rightarrow$ SYN-ACK $\rightarrow$ ACK.
- [x] **Default Ports:** HTTP (80), HTTPS (443), SSH (22), DNS (53).

---

## 5. ✍️ Test Yourself

:::practice At which layer does SSL/TLS encryption occur? || Layer 6: Presentation Layer. :::

:::practice What is the Protocol Data Unit (PDU) at Layer 4? || Segment (TCP) or Datagram (UDP). :::

:::practice Why is UDP preferred over TCP for live video calls? || Video calls prioritize low latency and real-time speed over retransmitting lost frames. :::
`
  },

  "calculus": {
    title: "Calculus: Derivatives & Integrals",
    subtitle: "Mathematics • High-Yield Revision Guide",
    tag: "Mathematics",
    theme: "aurora",
    content: `# 📐 ESSENTIAL CALCULUS CHEATSHEET
*Derivatives, Limits, and Fundamental Integration Techniques*

---

> [!KEY] Definition of the Derivative
> The derivative represents the instantaneous rate of change of a function $f(x)$ at point $x$:
> $$f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}$$

---

## 1. Master Differentiation Rules

| Rule Name | Function $f(x)$ | Derivative $f'(x)$ | Example |
| :--- | :--- | :--- | :--- |
| **Power Rule** | $x^n$ | $n x^{n-1}$ | $\frac{d}{dx}(x^4) = 4x^3$ |
| **Product Rule** | $u(x) \cdot v(x)$ | $u'v + uv'$ | $\frac{d}{dx}(x^2 \sin x) = 2x \sin x + x^2 \cos x$ |
| **Quotient Rule** | $\frac{u(x)}{v(x)}$ | $\frac{u'v - uv'}{v^2}$ | Low d-High minus High d-Low over Low squared |
| **Chain Rule** | $f(g(x))$ | $f'(g(x)) \cdot g'(x)$ | $\frac{d}{dx}\sin(x^2) = \cos(x^2) \cdot 2x$ |
| **Exponential** | $e^{kx}$ | $k e^{kx}$ | $\frac{d}{dx} e^{3x} = 3e^{3x}$ |
| **Natural Log** | $\ln(x)$ | $\frac{1}{x}$ | $\frac{d}{dx} \ln(5x) = \frac{1}{x}$ |

> [!TRICK] Quotient Rule Song
> *"Low d-High minus High d-Low, cross the line and square below!"*
> $$\left(\frac{u}{v}\right)' = \frac{v \cdot u' - u \cdot v'}{v^2}$$

---

## 2. Fundamental Theorem of Calculus (FTC)

### Part 1 (Area accumulator function):
$$\frac{d}{dx} \left[ \int_{a}^{x} f(t) \, dt \right] = f(x)$$

### Part 2 (Evaluation of definite integrals):
$$\int_{a}^{b} f(x) \, dx = F(b) - F(a) \quad \text{where } F'(x) = f(x)$$

---

## 3. Common Integration Shortcuts

| Integral | Result (+ C) | Note |
| :--- | :--- | :--- |
| $\int x^n \, dx$ | $\frac{x^{n+1}}{n+1} + C$ | Valid for all $n \neq -1$ |
| $\int \frac{1}{x} \, dx$ | $\ln|x| + C$ | The critical $n = -1$ power |
| $\int \sin(x) \, dx$ | $-\cos(x) + C$ | Watch the negative sign! |
| $\int \cos(x) \, dx$ | $\sin(x) + C$ | Positive result |
| $\int \sec^2(x) \, dx$| $\tan(x) + C$ | Direct derivative inverse |

---

## 4. ✍️ Practice Exercises

:::practice Differentiate $y = (3x^2 + 1)^4$. || Using Chain Rule: $4(3x^2+1)^3 \cdot (6x) = 24x(3x^2+1)^3$. :::

:::practice Evaluate $\int (4x^3 - 2x + 5) \, dx$. || $x^4 - x^2 + 5x + C$. :::
`
  },

  "python": {
    title: "Python Data Structures & Complexity",
    subtitle: "Software Engineering • Fast Reference Guide",
    tag: "Python",
    theme: "cyberpunk",
    content: `# 🐍 PYTHON DATA STRUCTURES & BIG-O
*Time Complexity, Built-in Methods & Modern Idioms*

---

> [!KEY] Memory & Lookup Rules
> - **Lists & Tuples:** Sequential indexed memory arrays. Index lookup is $\mathcal{O}(1)$.
> - **Dicts & Sets:** Hash tables with amortized $\mathcal{O}(1)$ average lookups and inserts.

---

## 1. Built-in Data Structures Comparison

| Data Structure | Ordered? | Mutable? | Duplicates? | Indexing | Internal Implementation |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **List** \`[ ]\` | Yes | Yes | Yes | $0 \dots n-1$ | Dynamic array |
| **Tuple** \`( )\` | Yes | No | Yes | $0 \dots n-1$ | Immutable contiguous array |
| **Set** \`{ }\` | No | Yes | No | None | Hash table (keys only) |
| **Dict** \`{k:v}\` | Yes* (3.7+) | Yes | Keys unique | By Key | Sparse hash table + dense indices |

---

## 2. Big-O Complexity Matrix

| Operation | List | Dict | Set | Deque (\`collections\`) |
| :--- | :---: | :---: | :---: | :---: |
| **Access by index / key** | $\mathcal{O}(1)$ | $\mathcal{O}(1)$ | N/A | $\mathcal{O}(n)$ |
| **Append to end** | $\mathcal{O}(1)$ amortized | $\mathcal{O}(1)$ | $\mathcal{O}(1)$ | $\mathcal{O}(1)$ |
| **Prepend / Pop Left** | $\mathcal{O}(n)$ | N/A | N/A | $\mathbf{\mathcal{O}(1)}$ |
| **Search (\`x in collection\`)**| $\mathcal{O}(n)$ | $\mathbf{\mathcal{O}(1)}$ | $\mathbf{\mathcal{O}(1)}$ | $\mathcal{O}(n)$ |
| **Delete element** | $\mathcal{O}(n)$ | $\mathcal{O}(1)$ | $\mathcal{O}(1)$ | $\mathcal{O}(n)$ |

> [!WARN] Common Performance Trap
> Checking \`if item in my_list:\` inside a loop creates an **$\mathcal{O}(n^2)$** algorithm! Convert the list to a \`set\` beforehand for **$\mathcal{O}(n)$** overall performance.

---

## 3. High-Performance Idioms

\`\`\`python
# 1. List & Dict Comprehension
squares = [x**2 for x in range(10) if x % 2 == 0]
lookup = {user.id: user.name for user in users}

# 2. Deque for FIFO Queue (Never use list.pop(0)!)
from collections import deque
queue = deque(["task1", "task2"])
queue.append("task3")
next_item = queue.popleft() # O(1) lightning fast!
\`\`\`

---

## 4. ✍️ Test Yourself

:::practice Why is \`list.insert(0, val)\` slow for large lists? || It shifts every existing element by 1 memory slot to the right ($\mathcal{O}(n)$ time). :::

:::practice Can a list be used as a key in a Python dictionary? || No, keys must be hashable and immutable; use a tuple instead. :::
`
  }
};

class NoteGenerator {
  // Generate note using smart local synthesis or online API
  static async generate({ topic, style = "revision", subject = "general", apiKey = "", provider = "gemini" }) {
    // If user provided a Gemini API Key, call Gemini API
    if (apiKey && apiKey.trim().length > 10) {
      if (provider === "gemini") {
        return await this.callGeminiApi(topic, style, subject, apiKey.trim());
      } else if (provider === "openai") {
        return await this.callOpenAiApi(topic, style, subject, apiKey.trim());
      }
    }

    // Otherwise use Smart Local Generator
    return this.generateSmartLocal(topic, style, subject);
  }

  static generateSmartLocal(topic, style, subject) {
    const cleanTopic = topic.trim().toLowerCase();
    
    // Check if matches known topic keys
    for (const [key, preset] of Object.entries(SMART_TOPIC_KNOWLEDGE)) {
      if (cleanTopic.includes(key) || key.includes(cleanTopic)) {
        return {
          title: preset.title,
          subtitle: preset.subtitle,
          tag: preset.tag,
          theme: preset.theme,
          content: preset.content
        };
      }
    }

    // Dynamic smart generation based on query words
    const capitalizedTopic = topic
      .split(" ")
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

    const formattedContent = `# ✦ ${capitalizedTopic.toUpperCase()}
*${subject.toUpperCase()} • Comprehensive Revision & Study Guide*

---

> [!KEY] Core Definition & Fundamental Principle
> **${capitalizedTopic}** is a pivotal subject in ${subject}. It provides the underlying mechanism for understanding systematic principles, optimization, and practical real-world problem-solving.

---

## 1. Key Components & Classifications

| Component / Phase | Primary Function | Key Characteristics | Practical Significance |
| :--- | :--- | :--- | :--- |
| **Foundation Layer** | Establishes base assumptions and rules | High stability, standardized parameters | Baseline integrity across systems |
| **Core Processing** | Executes the primary state transformation | Throughput-driven, metric-monitored | Direct performance output |
| **Control & Validation**| Ensures boundaries and error tolerances | Strict threshold verification | Prevents catastrophic failure modes |
| **Integration Layer** | Bridges outputs to consumer interfaces | Modular endpoints, standardized protocols | Seamless interoperability |

> [!TRICK] Memory Booster
> Remember the sequential workflow with the acronym **F-C-C-I**:
> **F**oundation $\rightarrow$ **C**ore $\rightarrow$ **C**ontrol $\rightarrow$ **I**ntegration!

---

## 2. Mathematical & Theoretical Framework

When analyzing ${capitalizedTopic}, the governing relationships can be modeled as:

$$S(t) = \sum_{i=1}^{n} w_i \cdot \phi_i(x_t) + \epsilon$$

Where:
- $S(t)$: System output at parameter state $t$
- $w_i$: Relative positional weighting coefficient
- $\phi_i(x)$: Base transfer function
- $\epsilon$: Residual error margin

---

## 3. Step-by-Step Implementation Procedure

1. **Phase 1: Environment & Preconditions**
   - Verify initial boundary conditions and validate incoming inputs.
   - Set baseline reference constants.
2. **Phase 2: Execution & Transformation**
   - Execute the standard algorithmic sequence.
   - Record intermediary state transitions.
3. **Phase 3: Post-Verification & Verification**
   - Compare observed metrics against expected tolerances.

> [!WARN] Common Pitfall to Avoid
> Never skip the boundary verification phase! Over 80% of unexpected edge-case errors originate from unvalidated input formats or out-of-range initial parameters.

---

## 4. ⚡ Quick Revision Checklist

- [x] **Primary objective:** Understand the governing principles of ${capitalizedTopic}.
- [x] **Core formula:** Balance efficiency with stability tolerances.
- [x] **Optimization technique:** Minimize latency and eliminate redundant computations.
- [x] **Standard convention:** Follow standardized industry naming and conventions.

---

## 5. ✍️ Practice & Self-Check

:::practice What is the primary purpose of the Foundation phase in ${capitalizedTopic}? || To establish robust baseline assumptions, standardized rules, and verified constraints before execution. :::

:::practice How do you mitigate unexpected boundary errors? || By implementing strict threshold checks and early-return input validation prior to processing. :::
`;

    return {
      title: capitalizedTopic,
      subtitle: `${subject.toUpperCase()} • Stylish Study Notes`,
      tag: subject || "Study",
      theme: "pastel",
      content: formattedContent
    };
  }

  static async callGeminiApi(topic, style, subject, apiKey) {
    const prompt = `You are NoteCraft Studio's master pedagogical designer. Create an exquisitely stylish, attractive, and high-yield revision note for the topic: "${topic}".
Subject context: ${subject}. Format requested: ${style}.

STRICT FORMATTING REQUIREMENTS:
1. Start with a top-level H1 header with an aesthetic symbol (e.g. # ✦ TITLE or # 🧠 TITLE), followed by a stylish italicized subtitle on the next line.
2. Include at least two block callouts using this EXACT markdown syntax:
   > [!KEY] Title
   > Content...
   > [!TRICK] Memory Trick / Mnemonic
   > Content...
   > [!WARN] Common Trap / Alert
   > Content...
   > [!TIP] Practical Advice
   > Content...
3. Include at least ONE rich comparison table formatted in clean markdown with column headers.
4. If applicable to math/science/CS, include beautiful KaTeX formulas ($x^2$ for inline, $$\\sum ...$$ for block formulas).
5. Include a step-by-step numbered breakdown or code snippet with syntax formatting.
6. Include a "⚡ Quick Revision Checklist" section using - [x] task list format.
7. End with a "✍️ Practice Yourself" section containing at least 2 interactive practice cards using this EXACT syntax:
   :::practice Question text? || Detailed answer text. :::

Output ONLY valid Markdown. Do not wrap in triple backticks \`\`\`markdown ... \`\`\`. Start immediately with the title.`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2500
        }
      })
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.error?.message || `Gemini API error: HTTP ${response.status}`);
    }

    const data = await response.json();
    let text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    text = text.replace(/^```markdown\s*/i, "").replace(/```\s*$/i, "").trim();

    return {
      title: topic,
      subtitle: `${subject} • AI Generated Stylish Note`,
      tag: subject || "AI Study",
      theme: "pastel",
      content: text
    };
  }

  static async callOpenAiApi(topic, style, subject, apiKey) {
    const prompt = `Create an exceptionally stylish study note on "${topic}" for subject "${subject}".
Include callouts (> [!KEY], > [!TRICK], > [!WARN]), rich tables, KaTeX math if relevant, checklist (- [x]), and practice cards (:::practice Q? || A :::).`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }]
      })
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.error?.message || `OpenAI API error: HTTP ${response.status}`);
    }

    const data = await response.json();
    let text = data.choices?.[0]?.message?.content || "";
    text = text.replace(/^```markdown\s*/i, "").replace(/```\s*$/i, "").trim();

    return {
      title: topic,
      subtitle: `${subject} • Generated Notes`,
      tag: subject || "Notes",
      theme: "notion",
      content: text
    };
  }
}

