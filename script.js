const DISCORD_ID = "799248479586615316";

        async function fetchDiscord() {
            try {
                const response = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`);
                const {
                    data
                } = await response.json();

                document.getElementById('username').textContent = `@${data.discord_user.username}`;
                document.getElementById('avatar').src = `https://cdn.discordapp.com/avatars/${DISCORD_ID}/${data.discord_user.avatar}.png`;

                const colors = {
                    online: '#43b581',
                    idle: '#faa61a',
                    dnd: '#f04747',
                    offline: '#747f8d'
                };
                document.getElementById('status-dot').style.backgroundColor = colors[data.discord_status] || colors.offline;

                const custom = data.activities.find(a => a.type === 4);
                document.getElementById('custom-status').textContent = custom ? custom.state : "";

                if (data.listening_to_spotify) {
                    document.getElementById('spotify').style.display = 'block';
                    document.getElementById('track-name').textContent = `${data.spotify.song} by ${data.spotify.artist}`;
                } else {
                    document.getElementById('spotify').style.display = 'none';
                }

                const activity = data.activities.find(a => a.type === 0);
                if (activity) {
                    document.getElementById('activity').style.display = 'block';
                    document.getElementById('activity-detail').textContent = `${activity.name} ${activity.details ? '- ' + activity.details : ''}`;
                } else {
                    document.getElementById('activity').style.display = 'none';
                }

                const isDoingSomething = data.listening_to_spotify || activity;
                document.getElementById('chilling').style.display = isDoingSomething ? 'none' : 'block';

                document.getElementById('profile').style.opacity = "1";
            } catch (err) {
                console.error("Lanyard error:", err);
            }
        }

        fetchDiscord();
        setInterval(fetchDiscord, 30000);
        
        function copyDiscord() {
            const username = document.getElementById('username').textContent.replace('@', '');
            
            navigator.clipboard.writeText(username).then(() => {
                const hint = document.getElementById('copy-hint');
                hint.style.opacity = "1";
                
                setTimeout(() => {
                    hint.style.opacity = "0";
                }, 2000);
            });
        }
