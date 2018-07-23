###################
# For UBUNTU users
###################

# Edit the hosts file: vi /etc/hosts
127.0.0.1   la5ng.local

# Copy the .conf file
cp /var/www/html/la5ng/deploys/20151217/local/la5ng.local.conf /etc/apache2/sites-available/
a2ensite la5ng.local.conf

# Restart Apache
service apache2 reload

####################
# For WINDOWS users
####################

# Edit the hosts file: c:\Windows\System32\drivers\etc\hosts
127.0.0.1   la5ng.local

# Edit the vhosts file: c:\wamp64\bin\apache\apache2.4.23\conf\extra\httpd-vhosts.conf
IncludeOptional "c:/www/la5ng/deploys/20151217/local/httpd-vhosts.conf"

# Restart WampServer

####################
# Before Installation
####################

# Install the following first:
https://git-scm.com
https://getcomposer.org
https://nodejs.org#v4.4.7
http://rubyinstaller.org

# After Node is installed, run the following commands step by step:
npm install -g bower grunt-cli less
gem install sass

####################
# Installation
####################

# Create a new database named "la5ng"
# Import DB from file "deploys/20151217/local/database/la5ng.sql.gz" into your MySQL
# cd to the "src" directory, run the command "composer install" in Terminal
# cd to the "src/public/themes/homer" directory, run the command "npm install"
# Login information: demo[@example.com] / @demo*