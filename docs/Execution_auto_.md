---
title: 'Execution (auto)'
---

## Installation

In addition to installing **lsFusion**, these installers/scripts also install **OpenJDK**, **PostgreSQL**, and **Tomcat**. Tomcat is embedded into the lsFusion Client installation, and OpenJDK and PostgreSQL are installed separately (in particular, in separate folders).

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="operating-systems" defaultValue="win" values={[{label: 'Windows', value: 'win'}, {label: 'Linux', value: 'linux'}]}>
<TabItem value="win">

Executable exe files:
lsFusion **4.1** Server & Client (+ OpenJDK **11.0.9**, PostgreSQL **13.1**(x64) / **10.8**(x32), Tomcat **9.0.21**):

- [x32](http://download.lsfusion.org/exe/lsfusion-4.1.exe)
- [x64](http://download.lsfusion.org/exe/lsfusion-4.1-x64.exe)
- <details><summary>Older versions</summary>

    - lsFusion 4.0 Server & Client
        - [x32](https://download.lsfusion.org/exe/lsfusion-4.0.exe)
        - [x64](https://download.lsfusion.org/exe/lsfusion-4.0-x64.exe)
    - lsFusion 3.1 Server & Client
        - [x32](https://download.lsfusion.org/exe/lsfusion-3.1.exe)
        - [x64](https://download.lsfusion.org/exe/lsfusion-3.1-x64.exe)
    - lsFusion 2.4 Server & Client
        - [x32](https://download.lsfusion.org/exe/lsfusion-2.4.exe)
        - [x64](https://download.lsfusion.org/exe/lsfusion-2.4-x64.exe)

  </details>

Subsequently, `$INSTALL_DIR$` refers to the folder selected during the installation of lsFusion (by default, `Program Files/lsFusion <version>`). It is also assumed that all parameters (ports, web context name) are left equal to default values.

</TabItem>
<TabItem value="linux">

Bash scripts using yum / apt (the latest stable releases are used as minor versions):

lsFusion **4** Server & Client (+ OpenJDK **1.8**, PostgreSQL **13**, Tomcat **9.0.21**):

| OS                            | Command / Script |
|-------------------------------| -----------------|
| RHEL 7 / CentOS 7 / Fedora 29 | `source <(curl -s https://download.lsfusion.org/yum/install-lsfusion4)` |
| Ubuntu 18 / Debian 9          | `source <(curl -s https://download.lsfusion.org/apt/install-lsfusion4)` PostgreSQL installs version 10, since that is the only one in the central repository. |

</TabItem>
</Tabs>

## After Installation

### Ports

After the installation is completed, the following will by default be locally installed on the computer and launched as services:

- DB server (PostgreSQL) on port 5432
- application server (Server) on port 7652
- web server (Client) on port 8080

### Installing / updating an application

In order to upload the developed logic to the installed application server (Server), you must:

Place [modules](Modules.md) developed in the lsFusion language as files with an lsf extension in a folder located in the server's [classpath](Launch_parameters.md#classpath-broken) (default value for automatic installation, see below). In addition, the rest of the resource files if any must also be placed there (e.g. report files, compiled Java files, images, etc.). These files may be placed in subfolders of the classpath, as well as inside jar files (zip archives with the jar extension). After all the files have been copied, you need to [restart](#restart-broken) the server.

:::info
It is often convenient to place all project files inside a single jar file. To generate such a file automatically, you can use [Maven](Development_manual_.md#maven) (with assemble and noserver profiles) or the build tools built into the [IDE](IDE.md#build).
:::

By default, the server's classpath is equal to `$APP_DIR$;$APP_DIR$/*;server.jar`, i.e. the `$APP_DIR$` folder and all its subfolders, all jar files in the `$APP_DIR$` folder (but not its subfolders), and also the jar file of the application server itself.
 
`$APP_DIR$` is equal to:
<Tabs groupId="operating-systems" defaultValue="win" values={[{label: 'Windows', value: 'win'}, {label: 'Linux', value: 'linux'}]}>
<TabItem value="win">

`$INSTALL_DIR$/lib`
</TabItem>
<TabItem value="linux">

`/var/lib/lsfusion`

The application server is installed and started under the automatically created non-privileged user `lsfusion` so files in the folder should be accessible for this user to read. 
</TabItem>
</Tabs>

### Installing / updating clients

To give users access to the installed system, you must:Send users a link to `http://<web address of the web server (Client)>:8080`. When users open this link, they will be redirected by default to the login page, where, if necessary, they can install the desktop client via Java Web Start (requires Java (JDK) installed, for example, by following [this](https://developers.redhat.com/products/openjdk/download) link with registration or this one [without](https://github.com/ojdkbuild/ojdkbuild) ). Web and desktop clients are updated automatically with [updates to the web server](#webupdate-broken) (Client)

:::info
Under Windows, you can also use desktop client [installers](http://download.lsfusion.org/exe/) (`lsfusion-desktop-*` files with the correct OS version and bit width). However, unlike installing with Java Web Start, a desktop client installed in this way will not be automatically updated. Therefore, you will need to update it manually by downloading the file of the new version of the desktop client (`lsfusion-client-4.<new version>.jar`) from [the central server](https://download.lsfusion.org/java) and replacing the `$INSTALL_DIR$/client.jar` file with it.
:::

:::caution
All paths and commands are given below for the major version 4 of the platform (for other versions just replace 4 with the required number, for example `lsfusion4-server` → `lsfusion11-server`)


<Tabs groupId="operating-systems" defaultValue="win" values={[{label: 'Windows', value: 'win'}, {label: 'Linux', value: 'linux'}]}>
<TabItem value="win">

Все пути по умолчанию
</TabItem>
<TabItem value="linux">

Пути изменены (в частности при помощи symlink'ов) в соответствии с идеологией Linux
</TabItem>
</Tabs>
:::

### Updating

Programs installed separately (OpenJDK, PostgreSQL) are also updated separately (for more details about this process, see the documentation for these programs)

<Tabs groupId="operating-systems" defaultValue="win" values={[{label: 'Windows', value: 'win'}, {label: 'Linux', value: 'linux'}]}>
<TabItem value="win">

Platform components are also updated separately from each other. To do this, you must download the file of the new version of the component from [the central server](https://download.lsfusion.org/java) and replace the following file with it:

|Component|Files|
|-|-|
|Application Server (Server)|File on the central server: `lsfusion-server-4.<new version>.jar`<br/>File to replace: `$INSTALL_DIR$/Server/server.jar`|
|Web server (Client)|File on the central server: `lsfusion-server-4.<new version>.jar`<br/>File to replace: `$INSTALL_DIR$/Client/webapps/ROOT.war`<br/>To update Tomcat, you need to download the archive with the new version of Tomcat and unzip it to the `$INSTALL_DIR$/Client` folder without the webapps directory and the [startup parameters](#webapp-broken) file|
</TabItem>
<TabItem value="linux">

Platform components are also updated separately from each other. To do this, you must run the commands:

#### Application Server (Server)

|OS|Command|
|--|-------|
|RHEL 7 / CentOS 7 / Fedora 29|`yum update lsfusion4_server`|
|Ubuntu 18 / Debian 9|`apt install lsfusion4_server`|

#### Web server (Client)


|OS|Command|
|--|-------|
|RHEL 7 / CentOS 7 / Fedora 29|`yum update lsfusion4_client`|
|Ubuntu 18 / Debian 9|`apt install lsfusion4_client`|
</TabItem>
</Tabs>

## Custom installation

## Manual setup (file paths, service names)
   
### [Startup parameters](Launch_parameters.md)

### Restart

### [Logs](Journals_and_logs.md)

### [Locale](Internationalization.md)

|Stage|Windows|Linux|
|---|---|---|
|Custom installation|If any of the programs listed in the installation (platform components) do not need to be installed / are already installed on your computer:|
|These programs can be excluded during installation using the corresponding graphical interface.|The following are scripts for installing specific platform components:Database Server - PostgreSQL <strong>11</strong>:<table class="wrapped confluenceTable"><colgroup><col  /><col  /></colgroup><tbody><tr class="header"><th class="confluenceTh">OS</th><th class="confluenceTh">Command / Script</th></tr><tr class="odd"><td class="confluenceTd">RHEL 7 / CentOS 7 / Fedora 29</td><td class="confluenceTd">source <(curl -s [https://download.lsfusion.org/yum/install-lsfusion4-db](https://download.lsfusion.org/yum/install-lsfusion2-db))</td></tr><tr class="even"><td class="confluenceTd">Ubuntu 18 / Debian 9</td><td class="confluenceTd">source <(curl -s [https://download.lsfusion.org/apt/install-lsfusion4-db](https://download.lsfusion.org/apt/install-lsfusion2-db))PostgreSQL <strong>10</strong></td></tr></tbody></table>Application Server - lsFusion 4 Server (+ OpenJDK <strong>1.8</strong>): <table class="wrapped confluenceTable"><tbody><tr class="header"><th class="confluenceTh">OS</th><th class="confluenceTh">Command / Script</th></tr><tr class="odd"><td class="confluenceTd">RHEL 7+ / CentOS 7+ / Fedora 29+</td><td class="confluenceTd">source <(curl -s [https://download.lsfusion.org/yum/install-lsfusion4-server](https://download.lsfusion.org/yum/install-lsfusion2-server))</td></tr><tr class="even"><td class="confluenceTd">Ubuntu 18 / Debian 9</td><td class="confluenceTd">source <(curl -s [https://download.lsfusion.org/apt/install-lsfusion4-server](https://download.lsfusion.org/yum/install-lsfusion2-server))</td></tr></tbody></table>Web server - lsFusion 4 Client (+ Tomcat <strong>9.0.20</strong>): <table class="wrapped confluenceTable"><tbody><tr class="header"><th class="confluenceTh">OS</th><th class="confluenceTh">Command / Script</th></tr><tr class="odd"><td class="confluenceTd">RHEL 7+ / CentOS 7+ / Fedora 29+</td><td class="confluenceTd">source <(curl -s [https://download.lsfusion.org/yum/install-lsfusion4-client](https://download.lsfusion.org/yum/install-lsfusion2-client))</td></tr><tr class="even"><td class="confluenceTd">Ubuntu 18 / Debian 9</td><td class="confluenceTd">source <(curl -s [https://download.lsfusion.org/apt/install-lsfusion4-client](https://download.lsfusion.org/yum/install-lsfusion2-client))</td></tr></tbody></table>|
|When installing platform components on different computers, it is also necessary to [configure the parameters](#settings-broken) to connect them to each other:<table class="wrapped confluenceTable"><tbody><tr class="header"><th class="confluenceTh">Components on different computers</th><th class="confluenceTh">Connection parameters</th><th class="confluenceTh">Configurable file</th></tr><tr class="odd"><td class="confluenceTd">DB server and application server (Server)</td><td class="confluenceTd">[Application server to DB server](Launch_parameters.md)</td><td class="confluenceTd">[File](#lsfusionapp-broken) lsFusion application server startup parameters</td></tr><tr class="even"><td class="confluenceTd">Application server (Server) and web server (Client)</td><td class="confluenceTd">[Web server to application server](Launch_parameters.md#connectapp-broken)</td><td class="confluenceTd">[File](#webapp-broken) lsFusion web server startup parameters</td></tr></tbody></table>When installing under Windows, the above parameters are requested during the installation process and the parameter files are configured automatically.|
|Manual setup (file paths, service names)|||||
|[Startup parameters](Launch_parameters.md)|Application server (Server):|
|[Java](Launch_parameters.md#appjava) |Java tab in the graphical interface $INSTALL\_DIR/Server/bin/lsfusion4\_serverw.exe<ul><li>[classpath](Launch_parameters.md#classpath-broken) - the Classpath parameter in the same tab</li></ul>|the <strong>FUSION\_OPTS</strong> parameter in the file /etc/lsfusion4-server/lsfusion.conf<ul><li>[classpath](Launch_parameters.md#classpath-broken): the <strong>CLASSPATH</strong> parameter in the same file</li></ul>|
|[lsFusion](Launch_parameters.md#appp3-broken) |the file $INSTALL_DIR/Server/conf/settings.properties|the file /etc/lsfusion4-server/settings.properties|
|Web server (Client): |
|[Java](Launch_parameters.md#webjava) |Java tab in the graphical interface $INSTALL_DIR/Client/bin/lsfusion4_serverw.exe|the <strong>CATALINA_OPTS</strong> parameter in the file /etc/lsfusion4-client/lsfusion.conf|
|[lsFusion](Launch_parameters.md#webp3-broken) |the file $INSTALL_DIR/Client/conf/catalina/localhost/ROOT.xml|the file /etc/lsfusion4-client/catalina/localhost/ROOT.xml|
|Desktop client: Java parameters are set inside the j2se tag in the jnlp file|
|Restart |Any changes made to the startup parameters, as well as changes to lsFusion modules, require a server restart (when changing lsFusion modules only the application server (Server)). This can be done with:Application server (Server)|
|GUI:Control Panel → Admin → Services → lsFusion 4 Serveror<strong>Command</strong> Expand source<span id="cb5-1">[](#1-broken)<span class="co"># Stop server</span></span><span id="cb5-2">[](#1-broken)<span class="va">$INSTALL_DIR</span><span class="ex">/Server/bin/lsfusion4_server.exe</span> //SS//lsfusion4_server</span><span id="cb5-3">[](#1-broken)</span><span id="cb5-4">[](#1-broken)<span class="co"># Start server</span></span><span id="cb5-5">[](#1-broken)<span class="va">$INSTALL_DIR</span><span class="ex">/Server/bin/lsfusion4_server.exe</span> //ES//lsfusion4_server</span>|<strong>Command</strong> Expand source<span id="cb6-1">[](#1-broken)<span class="co"># Stop server</span></span><span id="cb6-2">[](#1-broken)<span class="ex">systemctl</span> stop lsfusion4-server</span><span id="cb6-3">[](#1-broken)</span><span id="cb6-4">[](#1-broken)<span class="co"># Start server</span></span><span id="cb6-5">[](#1-broken)<span class="ex">systemctl</span> start lsfusion4-server</span>|
|Web server (Client)|
|GUI:Control Panel → Admin → Services → lsFusion 4 Clientor<strong>Command</strong> Expand source<span id="cb7-1">[](#1-broken)<span class="co"># Stop server</span></span><span id="cb7-2">[](#1-broken)<span class="va">$INSTALL_DIR</span><span class="ex">/Client/bin/lsfusion4_client.exe</span> //SS//lsfusion4_client</span><span id="cb7-3">[](#1-broken)</span><span id="cb7-4">[](#1-broken)<span class="co"># Start server</span></span><span id="cb7-5">[](#1-broken)<span class="va">$INSTALL_DIR</span><span class="ex">/Client/bin/lsfusion4_client.exe</span> //ES//lsfusion4_client</span>|<strong>Command</strong> Expand source<span id="cb8-1">[](#1-broken)<span class="co"># Stop client</span></span><span id="cb8-2">[](#1-broken)<span class="ex">systemctl</span> stop lsfusion4-client</span><span id="cb8-3">[](#1-broken)</span><span id="cb8-4">[](#1-broken)<span class="co"># Start client</span></span><span id="cb8-5">[](#1-broken)<span class="ex">systemctl</span> start lsfusion4-client</span>|
|[Logs](Journals_and_logs.md#logs)|Platform logs are written to the following folders:Application server (Server):|
|$INSTALL_DIR$/Server/logs|/var/log/lsfusion4-server|
|Web server (Client):|
|$INSTALL_DIR$/Client/logs|/var/log/lsfusion4-client|
|The main logs (including the process of stopping and starting the server) are located in:<ul><li>Application server (Server) - stdout</li><li>Web server (Client) - catalina.out (since the web server runs on Tomcat)*.*</li></ul>Desktop client logs: $USER_DIR$/.fusion/logs, where $USER_DIR$ is the user folder:|
|Users/<username\>|/home/<username\>|
|[Locale](Internationalization.md)|The locale used by the platform is determined based on the locale installed in the operating system. If necessary, it can be changed with:|
|GUI:Control Panel → Language and Regional Standards|<strong>Command</strong> Expand source<span id="cb9-1">[](#1-broken)<span class="ex">localectl</span> set-locale LANG=ru_RU.utf8</span>|
