// Preset stylish notes library
const PRESET_NOTES = {
  binary: {
    id: "binary-number-system",
    title: "Binary Number System",
    subtitle: "Digital Electronics • Stylish Revision Notes",
    tag: "Computer Science",
    theme: "pastel",
    font: "sans",
    paper: "dots",
    layout: "standard",
    colorAccent: "#6366f1",
    content: `# ✦ BINARY NUMBER SYSTEM
*Digital Electronics • High-Yield Revision Sheet*

---

> [!KEY] Key Idea
> Digital circuits and computing systems use the **binary number system**, which contains only **0** and **1**. A base (radix) is written as a subscript:
> - $(1010_2)$ = binary
> - $(1010_{10})$ = decimal
> The same digit pattern represents vastly different numerical values in different number systems!

---

## 1. Number Systems Overview

A number system is a systematic way of representing values using a defined set of symbols (digits).

| Number System | Base (Radix) | Allowed Digits | Primary Application |
| :--- | :---: | :--- | :--- |
| **Binary** | **2** | \`0, 1\` | Machine code, logic gates, digital memory |
| **Decimal** | **10** | \`0, 1, 2, 3, 4, 5, 6, 7, 8, 9\` | Human calculation, daily mathematics |
| **Ternary** | **3** | \`0, 1, 2\` | Specialized ternary logic, quantum states |
| **Octal** | **8** | \`0 – 7\` | Compact binary representation (groups of 3) |
| **Hexadecimal**| **16** | \`0 – 9, A – F\` | Memory addresses, web color hex codes |

---

## 2. Counting in Binary

Binary counting follows the exact same positional carry rule as decimal: **when a column runs out of available digits, reset it to 0 and carry 1 to the next column.**

| Decimal | 4-Bit Binary | Decimal | 4-Bit Binary |
| :---: | :---: | :---: | :---: |
| **0** | \`0000\` | **8** | \`1000\` |
| **1** | \`0001\` | **9** | \`1001\` |
| **2** | \`0010\` | **10** | \`1010\` |
| **3** | \`0011\` | **11** | \`1011\` |
| **4** | \`0100\` | **12** | \`1100\` |
| **5** | \`0101\` | **13** | \`1101\` |
| **6** | \`0110\` | **14** | \`1110\` |
| **7** | \`0111\` | **15** | \`1111\` |

> [!TIP] Watch the Carry Progression
> - $0_2 + 1_2 = 1_2$
> - $1_2 + 1_2 = 10_2$ (carry 1)
> - $11_2 + 1_2 = 100_2$ (double carry)
> - $111_2 + 1_2 = 1000_2$ (triple carry)

---

## 3. Positional-Weighted Place Values

Each binary digit is called a **bit** (Binary digit).
- **LSB** (Least Significant Bit): The rightmost bit carrying the smallest weight ($2^0 = 1$).
- **MSB** (Most Significant Bit): The leftmost bit carrying the highest power of 2.

### 8-Bit Byte Place Values Table

| Bit Position (from right) | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Power of 2** | $2^7$ | $2^6$ | $2^5$ | $2^4$ | $2^3$ | $2^2$ | $2^1$ | $2^0$ |
| **Decimal Weight** | **128** | **64** | **32** | **16** | **8** | **4** | **2** | **1** |

> [!TRICK] Golden Memory Rule
> Start at the far right with **1**, then **double the value** each step as you move left:
> **1 → 2 → 4 → 8 → 16 → 32 → 64 → 128 → 256 → 512 → 1024!**

---

## 4. Binary-to-Decimal Conversion

**The Standard Method:**
1. Write the place weight powers of 2 under each bit.
2. Multiply each bit by its respective place value.
3. Sum all the products (bits with \`0\` contribute nothing).

### Worked Example: Convert $(11101010_2)$ to Decimal

| Bit Value | **1** | **1** | **1** | **0** | **1** | **0** | **1** | **0** |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Weight** | 128 | 64 | 32 | 16 | 8 | 4 | 2 | 1 |
| **Product** | 128 | 64 | 32 | 0 | 8 | 0 | 2 | 0 |

$$\text{Sum} = 128 + 64 + 32 + 0 + 8 + 0 + 2 + 0 = 234_{10}$$

> [!NOTE] Shortcut Example: $(1111_2)$
> When all bits up to a power are 1:
> $$8 + 4 + 2 + 1 = 15 = 2^4 - 1$$

---

## 5. Fractional Binary Numbers

Digits placed to the right of the binary radix point represent negative powers of 2:

| Position After Radix | Power of 2 | Fractional Value | Decimal Value |
| :--- | :---: | :---: | :---: |
| **1st position** | $2^{-1}$ | $\frac{1}{2}$ | **0.5** |
| **2nd position** | $2^{-2}$ | $\frac{1}{4}$ | **0.25** |
| **3rd position** | $2^{-3}$ | $\frac{1}{8}$ | **0.125** |
| **4th position** | $2^{-4}$ | $\frac{1}{16}$ | **0.0625** |

### Example: Convert $(101.011_2)$ to Decimal
$$101_2 = 4 + 0 + 1 = 5$$
$$0.011_2 = 0 \times 0.5 + 1 \times 0.25 + 1 \times 0.125 = 0.375$$
$$\mathbf{(101.011_2) = 5.375_{10}}$$

---

## 6. ⚡ Quick Revision Checklist

- [x] **Base of Binary:** $b = 2$, only digits \`0\` and \`1\`.
- [x] **Bit:** Fundamental unit of binary digital information.
- [x] **LSB:** Rightmost bit ($2^0$), **MSB:** Leftmost bit ($2^n$).
- [x] **Integer weights:** $1, 2, 4, 8, 16, 32, 64, 128...$
- [x] **Fractional weights:** $0.5, 0.25, 0.125, 0.0625...$
- [x] **Max value of $n$ bits:** $2^n - 1$ (e.g. 8 bits $\rightarrow 255$).

---

## 7. ✍️ Practice Yourself & Check Answers

:::practice Convert $(1101_2)$ to decimal. || Weight calculation: $8 + 4 + 0 + 1 = 13_{10}$. :::

:::practice What is the decimal value of $(10010_2)$? || Weight calculation: $16 + 0 + 0 + 2 + 0 = 18_{10}$. :::

:::practice Convert $(101.101_2)$ to decimal. || Integer part: $4+1=5$. Fractional part: $0.5 + 0.125 = 0.625$. Answer: $5.625_{10}$. :::

:::practice How many distinct numbers can be represented by 8 bits (1 byte)? || $2^8 = 256$ values (ranges from 0 to 255). :::
`
  },

  neural: {
    id: "neural-networks",
    title: "Deep Learning & Neural Networks",
    subtitle: "AI Architecture • Comprehensive Cheat Sheet",
    tag: "Machine Learning",
    theme: "cyberpunk",
    font: "sans",
    paper: "grid",
    layout: "standard",
    colorAccent: "#06b6d4",
    content: `# 🧠 DEEP LEARNING & NEURAL NETWORKS
*Fundamental Architecture, Math & Optimization Notes*

---

> [!KEY] Core Concept
> An Artificial Neural Network (ANN) approximates a function $f^*(x)$ mapping inputs $x$ to predictions $\hat{y}$ through parameterized layers of matrix multiplications and non-linear activation functions:
> $$\hat{y} = \sigma(W^T x + b)$$

---

## 1. Activation Functions Comparison

| Activation | Mathematical Formula | Range | Gradient Behavior | Typical Use Case |
| :--- | :--- | :---: | :--- | :--- |
| **ReLU** | $f(x) = \max(0, x)$ | $[0, \infty)$ | Constant 1 for $x>0$; zero for $x \le 0$ | Standard default hidden layers |
| **Leaky ReLU** | $f(x) = \max(\alpha x, x)$ | $(-\infty, \infty)$ | Prevents "Dying ReLU" issue | Deep networks, GANs |
| **Sigmoid** | $\sigma(x) = \frac{1}{1 + e^{-x}}$ | $(0, 1)$ | Vanishes at extremes ($<0.25$) | Binary classification output |
| **Softmax** | $\sigma(z)_i = \frac{e^{z_i}}{\sum_j e^{z_j}}$ | $(0, 1)$ | Normalized probability distribution | Multi-class classification |

> [!WARN] Vanishing Gradient Alert
> Sigmoid and Tanh activations saturate at large $|x|$. Gradients shrink exponentially in deep layers during backpropagation, halting learning. Use **ReLU** or **GELU** for deep hidden layers!

---

## 2. Forward Propagation & Loss Computation

For a multi-layer perceptron with layer $l$:
$$z^{[l]} = W^{[l]} a^{[l-1]} + b^{[l]}$$
$$a^{[l]} = g^{[l]}(z^{[l]})$$

### Loss Functions

- **Mean Squared Error (Regression):**
  $$\mathcal{L}_{MSE}(y, \hat{y}) = \frac{1}{2} (y - \hat{y})^2$$
- **Binary Cross-Entropy (Classification):**
  $$\mathcal{L}_{BCE}(y, \hat{y}) = - [y \log \hat{y} + (1 - y) \log(1 - \hat{y})]$$

---

## 3. Backpropagation with Chain Rule

To update weight $W^{[l]}$, we compute the partial derivative of loss $\mathcal{L}$ with respect to $W^{[l]}$:

$$\frac{\partial \mathcal{L}}{\partial W^{[l]}} = \frac{\partial \mathcal{L}}{\partial a^{[l]}} \cdot \frac{\partial a^{[l]}}{\partial z^{[l]}} \cdot \frac{\partial z^{[l]}}{\partial W^{[l]}}$$

### Weight Update Step (Gradient Descent with Learning Rate $\alpha$):
$$W^{[l]} := W^{[l]} - \alpha \frac{\partial \mathcal{L}}{\partial W^{[l]}}$$

> [!TRICK] Momentum Mnemonic
> Think of gradient descent like a heavy ball rolling down a hilly terrain. **Momentum** carries speed through shallow plateaus and dampens wild oscillations in steep ravines!
`
  },

  cornellBio: {
    id: "photosynthesis-cornell",
    title: "Photosynthesis & Cellular Energy",
    subtitle: "Cellular Biology • Cornell Study System",
    tag: "Biology",
    theme: "sage",
    font: "serif",
    paper: "lines",
    layout: "cornell",
    colorAccent: "#10b981",
    content: `# 🌿 PHOTOSYNTHESIS & CELLULAR ENERGY
*Cornell Revision Method • Chloroplast Function & Metabolic Pathways*

---

> [!KEY] Overall Equation
> $$6\text{CO}_2 + 6\text{H}_2\text{O} + \text{Light Energy} \longrightarrow \text{C}_6\text{H}_{12}\text{O}_6 + 6\text{O}_2$$
> Photosynthesis converts solar photon energy into chemical bond energy stored in glucose.

---

## Light Reactions vs. Calvin Cycle

| Feature | Light-Dependent Reactions | Light-Independent (Calvin Cycle) |
| :--- | :--- | :--- |
| **Site** | Thylakoid membrane | Stroma (liquid matrix of chloroplast) |
| **Inputs** | Photons, $\text{H}_2\text{O}$, $\text{ADP}$, $\text{NADP}^+$ | $\text{CO}_2$, $\text{ATP}$, $\text{NADPH}$ |
| **Outputs** | $\text{O}_2$, $\text{ATP}$, $\text{NADPH}$ | $\text{G3P}$ (Glucose precursor), $\text{ADP}$, $\text{NADP}^+$ |
| **Key Enzyme** | Photosystems II & I, ATP Synthase | **RuBisCO** (Ribulose-1,5-bisphosphate carboxylase) |

> [!TRICK] Photolysis Mnemonic
> **Water is split at Photosystem II!** Remember: **PSII comes BEFORE PSI** in the flow of electrons, even though it was discovered second!

---

## 3 Phases of the Calvin Cycle

1. **Carbon Fixation:** $\text{CO}_2$ combines with 5-carbon RuBP via RuBisCO.
2. **Reduction:** ATP and NADPH convert 3-PGA into G3P (high energy sugar).
3. **Regeneration:** Remaining G3P molecules use ATP to regenerate RuBP acceptor.

:::practice Why is RuBisCO considered inefficient? || It can catalyze oxygenation instead of carboxylation (photorespiration), wasting up to 25% of energy. :::

:::practice What is the ultimate source of electrons in light reactions? || Water ($\text{H}_2\text{O}$), which releases oxygen as a byproduct during photolysis. :::
`
  }
};

