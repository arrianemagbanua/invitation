const gifStages = [
    "https://media1.tenor.com/m/yEG23sxXIVQAAAAd/shrek-shrek-meme.gif",    // 0 
    "https://media1.tenor.com/m/nLj5Fm_M9P8AAAAd/kween-leng-leng-leng-leng.gif",  // 1
    "https://i.pinimg.com/1200x/1f/ec/7a/1fec7a8ed4b9829f8336b33b5995e2a3.jpg",             // 2
    "https://media1.tenor.com/m/vrTn_y6n5skAAAAd/kaldag.gif",             // 3
    "https://media1.tenor.com/m/HA-zAiQ294wAAAAC/scarlette-arman-salon.gif",       // 4
    "https://media1.tenor.com/m/YrBhzo13x7kAAAAd/babae-umiiyak-pinoy-reaction.gif",             // 5
    "https://media1.tenor.com/m/7JZ7sxbOWIwAAAAC/bakla-crush.gif",               // 6
    "https://media1.tenor.com/m/oDHmRSkJqCMAAAAd/taehyung-disgusted-taehyung.gif"  // 7
]

const noMessages = [
    "Yawko",
    "Tol may pagkain don...",
    "Ayh wag naman tayo ganyan",
    "Promise ya sulit punta mo",
    "Ano ano? Bastusan?",
    "Sige lang haha ganyan ka naman",
    "Hoy anobah :[",
    "Last chance! 😭",
    "Di mo ko mahahabol 😜"
]

const yesTeasePokes = [
    "Mag no ka muna",
    "Luh ang KJ",
    "Mag no ngani munaa",
    "Luh, ang kulit?"
]

let yesTeasedCount = 0

let noClickCount = 0
let runawayEnabled = false
let musicPlaying = true

const catGif = document.getElementById('cat-gif')
const yesBtn = document.getElementById('yes-btn')
const noBtn = document.getElementById('no-btn')
const music = document.getElementById('bg-music')

// Autoplay: audio starts muted (bypasses browser policy), unmute immediately
music.muted = true
music.volume = 0.3
music.play().then(() => {
    music.muted = false
}).catch(() => {
    // Fallback: unmute on first interaction
    document.addEventListener('click', () => {
        music.muted = false
        music.play().catch(() => {})
    }, { once: true })
})

function toggleMusic() {
    if (musicPlaying) {
        music.pause()
        musicPlaying = false
        document.getElementById('music-toggle').textContent = '🔇'
    } else {
        music.muted = false
        music.play()
        musicPlaying = true
        document.getElementById('music-toggle').textContent = '🔊'
    }
}

function handleYesClick() {
    if (!runawayEnabled) {
        // Tease her to try No first
        const msg = yesTeasePokes[Math.min(yesTeasedCount, yesTeasePokes.length - 1)]
        yesTeasedCount++
        showTeaseMessage(msg)
        return
    }
    window.location.href = 'yes.html'
}

function showTeaseMessage(msg) {
    let toast = document.getElementById('tease-toast')
    toast.textContent = msg
    toast.classList.add('show')
    clearTimeout(toast._timer)
    toast._timer = setTimeout(() => toast.classList.remove('show'), 2500)
}

function handleNoClick() {
    noClickCount++

    // Cycle through guilt-trip messages
    const msgIndex = Math.min(noClickCount, noMessages.length - 1)
    noBtn.textContent = noMessages[msgIndex]

    // Grow the Yes button bigger each time
    const currentSize = parseFloat(window.getComputedStyle(yesBtn).fontSize)
    yesBtn.style.fontSize = `${currentSize * 1.35}px`
    const padY = Math.min(18 + noClickCount * 5, 60)
    const padX = Math.min(45 + noClickCount * 10, 120)
    yesBtn.style.padding = `${padY}px ${padX}px`

    // Shrink No button to contrast
    if (noClickCount >= 2) {
        const noSize = parseFloat(window.getComputedStyle(noBtn).fontSize)
        noBtn.style.fontSize = `${Math.max(noSize * 0.85, 10)}px`
    }

    // Swap cat GIF through stages
    const gifIndex = Math.min(noClickCount, gifStages.length - 1)
    swapGif(gifStages[gifIndex])

    // Runaway starts at click 5
    if (noClickCount >= 5 && !runawayEnabled) {
        enableRunaway()
        runawayEnabled = true
    }
}

function swapGif(src) {
    catGif.style.opacity = '0'
    setTimeout(() => {
        catGif.src = src
        catGif.style.opacity = '1'
    }, 200)
}

function enableRunaway() {
    noBtn.addEventListener('mouseover', runAway)
    noBtn.addEventListener('touchstart', runAway, { passive: true })
}

function runAway() {
    const margin = 20
    const btnW = noBtn.offsetWidth
    const btnH = noBtn.offsetHeight
    const maxX = window.innerWidth - btnW - margin
    const maxY = window.innerHeight - btnH - margin

    const randomX = Math.random() * maxX + margin / 2
    const randomY = Math.random() * maxY + margin / 2

    noBtn.style.position = 'fixed'
    noBtn.style.left = `${randomX}px`
    noBtn.style.top = `${randomY}px`
    noBtn.style.zIndex = '50'
}
